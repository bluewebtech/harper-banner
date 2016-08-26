export default {
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
    init (selector) {
        $(selector).append(this.element);
    }
}
