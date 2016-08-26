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
    }
}
