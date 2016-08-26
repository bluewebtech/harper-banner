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
                var timer = settings.duration;
                self.count = 0;

                if (self.total() > 0) {
                    self.controls();
                    self.base();
                    setInterval(self.transition, timer);
                }
            },

            /**
             * Get the base/default slide.
             *
             * @return {void}
             */
            base () {
                $(selector + ' ul.controls li').eq(this.first()).addClass('hover');
                $(this.slides()[this.first()])
                    .css({'background-image': 'url("' + $(this.slides()[this.first()])
                    .data('background') + '")'})
                    .show();
            },

            /**
             * Set and populate all controls.
             *
             * @return {void}
             */
            controls () {
                for (var i = 0; i < this.total(); i++) {
                    $(selector + ' ul.controls').append('<li></li>');
                }

                $(selector + ' ul.controls li').on('click', function () {
                    //console.log($(this).index());
                })
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
             * Get the index of the last slide.
             *
             * @return {int}
             */
            last () {
                return this.total() - 1;
            },

            /**
             * Run the slide transitions.
             *
             * @param {int} id
             * @return {void}
             */
            slide (id) {
                var current = (id - 1 < 0 ? this.last() : id - 1);
                var next = id;

                $(selector + ' ul.controls li').eq(current).removeClass('hover');
                $(selector + ' ul.controls li').eq(next).addClass('hover');

                $(selector + ' .overlay')
                    .html($(this.slides()[current]).html())
                    .show()
                    .css({'background-image': 'url("' + $(this.slides()[current])
                    .data('background') + '")'})
                    .fadeOut(2000);

                //$(this.slides()[next]).addClass('hover');
                $(this.slides()[next])
                    .hide()
                    .css({'background-image': 'url("' + $(this.slides()[next])
                    .data('background') + '")'})
                    .fadeIn(4000);
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
                self.count++;

                if (self.count == self.last()) {
                    self.slide(self.count);
                } else if (self.count > self.first() && self.count < self.total()) {
                    self.slide(self.count);
                } else {
                    self.count = 0;
                    self.slide(self.count);
                }
            }
        };

        /**
         * Initialize the banner.
         */
        harper.init(selector);
    };
}($));
