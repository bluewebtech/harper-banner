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
	                var timer = settings.duration;
	                self.count = 0;

	                _overlay2.default.init(selector);
	                _controls2.default.init(selector);

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
	            base: function base() {
	                $(selector + ' ul.controls li').eq(this.first()).addClass('hover');
	                $(this.slides()[this.first()]).css({ 'background-image': 'url("' + $(this.slides()[this.first()]).data('background') + '")' }).show();
	            },


	            /**
	             * Set and populate all controls.
	             *
	             * @return {void}
	             */
	            controls: function controls() {
	                for (var i = 0; i < this.total(); i++) {
	                    $(selector + ' ul.controls').append('<li></li>');
	                }

	                $(selector + ' ul.controls li').on('click', function () {
	                    //console.log($(this).index());
	                });
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
	             * Get the index of the last slide.
	             *
	             * @return {int}
	             */
	            last: function last() {
	                return this.total() - 1;
	            },


	            /**
	             * Run the slide transitions.
	             *
	             * @param {int} id
	             * @return {void}
	             */
	            slide: function slide(id) {
	                var current = id - 1 < 0 ? this.last() : id - 1;
	                var next = id;

	                $(selector + ' ul.controls li').eq(current).removeClass('hover');
	                $(selector + ' ul.controls li').eq(next).addClass('hover');

	                $(selector + ' .overlay').html($(this.slides()[current]).html()).show().css({ 'background-image': 'url("' + $(this.slides()[current]).data('background') + '")' }).fadeOut(2000);

	                //$(this.slides()[next]).addClass('hover');
	                $(this.slides()[next]).hide().css({ 'background-image': 'url("' + $(this.slides()[next]).data('background') + '")' }).fadeIn(4000);
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
	})($);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    element: '<ul class="controls"></ul>',

	    init: function init(selector) {
	        $(selector).append(this.element);
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
	    element: '<div class="overlay"></div>',

	    init: function init(selector) {
	        $(selector).prepend(this.element);
	    }
	};

/***/ }
/******/ ]);