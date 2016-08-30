/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _controls = __webpack_require__(1);

	var _controls2 = _interopRequireDefault(_controls);

	var _overlay = __webpack_require__(2);

	var _overlay2 = _interopRequireDefault(_overlay);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function ($) {
	    $.fn.harper = function (options) {
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
	            init: function init(selector) {
	                var self = harper;
	                self.timer = settings.duration;
	                var interval;
	                self.current = 0;
	                self.previous = 0;
	                self.slide = 0;

	                self.debug();
	                _overlay2.default.init(selector);
	                _controls2.default.init(selector, this.slides());
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
	            debug: function debug() {
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
	            first: function first() {
	                return 0;
	            },


	            /**
	             * Run the slide transitions.
	             *
	             * @param {int} id
	             * @return {void}
	             */
	            getSlide: function getSlide(slide) {
	                var base = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	                var self = harper;
	                var $slides = this.slides();
	                self.current = slide;
	                self.previous = slide - 1 < 0 ? this.last() : slide - 1;
	                var currentSlideObject = $($slides[self.current]);
	                var controlItemObject = $(selector + ' ul.controls li');

	                _overlay2.default.get(selector, $($slides[self.previous]));

	                if (base) {
	                    var baseSlideObject = $($slides[this.first()]);
	                    baseSlideObject.css({ 'background-image': 'url("' + baseSlideObject.data('background') + '")' }).show();
	                    controlItemObject.eq(this.first()).addClass('hover');
	                } else {
	                    self.debug();
	                    currentSlideObject.hide().css({ 'background-image': 'url("' + currentSlideObject.data('background') + '")' }).fadeIn(4000);
	                    $(selector + ' ul.controls li').removeClass('hover').eq(self.current).addClass('hover');
	                }
	            },


	            /**
	             * Get the index of the last slide.
	             *
	             * @return {int}
	             */
	            last: function last() {
	                return this.total() - 1;
	            },


	            /**
	             * Get all available slides.
	             *
	             * @return {array}
	             */
	            slides: function slides() {
	                var items = $(selector + ' ul.slides li');
	                var slides = [];

	                items.hide().each(function (i, v) {
	                    slides.push(v);
	                });

	                return slides;
	            },


	            /**
	             * Get the total of available slides.
	             *
	             * @return {int}
	             */
	            total: function total() {
	                return this.slides().length;
	            },


	            /**
	             * Handle the slide transition position.
	             *
	             * @return {void}
	             */
	            transition: function transition() {
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
	})($);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    /**
	     * The HTML element.
	     *
	     * @type {string}
	     */
	    element: '<ul class="controls"></ul>',

	    /**
	     * Initialize the module.
	     *
	     * @param {string} selector
	     * @return {void}
	     */
	    init: function init(selector, slides) {
	        $(selector).append(this.element);

	        for (var i = 0; i < slides.length; i++) {
	            $(selector + ' ul.controls').append('<li></li>');
	        }
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  /**
	   * The HTML element.
	   *
	   * @type {string}
	   */
	  element: '<div class="overlay"></div>',

	  /**
	   * Initialize the module.
	   *
	   * @param {string} selector
	   * @return {void}
	   */
	  init: function init(selector) {
	    $(selector).prepend(this.element);
	  },


	  /**
	   * Get the slide overlay.
	   *
	   * @param {string} selector
	   * @param {object} slide
	   * @return {void}
	   */
	  get: function get(selector, slide) {
	    var overlayObject = $(selector + ' .overlay');

	    overlayObject.html(slide.html()).show().css({ 'background-image': 'url("' + slide.data('background') + '")' }).fadeOut(2000);
	  }
	};

/***/ }
/******/ ]);