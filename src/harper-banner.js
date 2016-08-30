import controls from './js/controls';
import overlay from './js/overlay';

(function($) {
    $.fn.harper = function(options) {
        /**
         * The plugin defaults.
         *
         * @type {object}
         */
        var defaults = {
            debug: false,
            duration: 10000
        };

        /**
         * Content element class or id selector.
         *
         * @type {string}
         */
        var selector = this.selector;

        /**
         * The plugin settings.
         *
         * @type {object}
         */
        var settings = $.extend({
            debug: defaults.debug,
            duration: defaults.duration
        }, options);

        /**
         * Banner inializer.
        */
        var harper = {
            /**
             * Initialize the plugin.
             *
             * @param {string} selector
             * @return {void}
             */
            init (selector) {
                var self = harper;
                self.timer = settings.duration;
                var interval;
                self.current = 0;
                self.previous = 0;
                self.slide = 0;

                self.debug();
                overlay.init(selector);
                controls.init(selector, this.slides());
                self.getSlide(self.slide, true);

                interval = setInterval(self.transition, self.timer);

                $(selector + ' ul.controls li').on('click', function () {
                    self.slide = $(this).index();
                    self.getSlide(self.slide);
                    clearInterval(interval);
                    setInterval(self.transition, self.timer);

                    $(selector + ' ul.controls li').removeClass('hover').eq(self.slide).addClass('hover');
                });
            },

            /**
             * The debug output.
             *
             * @return {void}
             */
            debug () {
                var self = harper;
                var next;

                if (self.slide == self.last()) {
                    next = self.first();
                } else {
                    next = self.slide + 1;
                }

                if (settings.debug) {
                    console.log('Current: ' + self.slide + ' Next: ' + next + ' Last: ' + self.last());
                }
            },

            /**
             * Get the slide root index.
             * This should always have an index of 0.
             *
             * @return {int}
             */
            first () {
                return 0;
            },

            /**
             * Run the slide transitions.
             *
             * @param {int} id
             * @return {void}
             */
            getSlide (slide, base = false) {
                var self = harper;
                var $slides = this.slides();
                self.current = slide;
                self.previous = (slide - 1 < 0 ? this.last() : slide - 1);
                var currentSlideObject = $($slides[self.current]);
                var controlItemObject = $(selector + ' ul.controls li');

                overlay.get(selector, $($slides[self.previous]));

                if (base) {
                    var baseSlideObject = $($slides[this.first()]);
                    baseSlideObject.css({'background-image': 'url("' + baseSlideObject.data('background') + '")'}).show();
                    controlItemObject.eq(this.first()).addClass('hover');
                } else {
                    self.debug();
                    currentSlideObject.hide().css({'background-image': 'url("' + currentSlideObject.data('background') + '")'}).fadeIn(4000);
                    $(selector + ' ul.controls li').removeClass('hover').eq(self.current).addClass('hover');
                }
            },

            /**
             * Get the index of the last slide.
             *
             * @return {int}
             */
            last () {
                return this.total() - 1;
            },

            /**
             * Get all available slides.
             *
             * @return {array}
             */
            slides () {
                var items = $(selector + ' ul.slides li');
                var slides = [];

                items.hide().each(function(i, v) {
                    slides.push(v);
                });

                return slides;
            },

            /**
             * Get the total of available slides.
             *
             * @return {int}
             */
            total () {
                return this.slides().length;
            },

            /**
             * Handle the slide transition position.
             *
             * @return {void}
             */
            transition () {
                var self = harper;

                if (self.slide == self.last()) {
                    self.slide = 0;
                } else {
                    self.slide++;
                }

                self.getSlide(self.slide);
            }
        };

        /**
         * Initialize the banner.
         */
        harper.init(selector);
    };
}($));
