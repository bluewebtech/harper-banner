export default {
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
    init (selector) {
        $(selector).prepend(this.element);
    },

    /**
     * Get the slide overlay.
     *
     * @param {string} selector
     * @param {object} slide
     * @return {void}
     */
    get (selector, slide) {
        var overlayObject = $(selector + ' .overlay');

        overlayObject.html(slide.html()).show().css({'background-image': 'url("' + slide.data('background') + '")'}).fadeOut(2000);
    }
}
