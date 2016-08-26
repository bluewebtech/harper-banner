export default {
    element: '<div class="overlay"></div>',

    init (selector) {
        $(selector).prepend(this.element);
    }
}
