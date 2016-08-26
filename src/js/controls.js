export default {
    element: '<ul class="controls"></ul>',

    init (selector) {
        $(selector).append(this.element);
    }
}
