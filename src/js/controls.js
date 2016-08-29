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
    init (selector, slides) {
        $(selector).append(this.element);

        for (var i = 0; i < slides.length; i++) {
            $(selector + ' ul.controls').append('<li></li>');
        }
    }
}
