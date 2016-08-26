/**
 * Gulp configuration module.
 *
 * This configuration module contains all path and extension values.
 */
module.exports = {
    path: require('path'),

    /**
     * The file extensions.
     *
     * @return obj
     */
    ext: {
        css: '.css',
        js: '.js',
        min: '.min',
        scss: '.scss'
    },

    /**
     * The file names.
     *
     * @return obj
     */
    file: {
        app: 'app',
        css: 'style',
        lib: 'lib'
    },

    /**
     * Get the OS directory separator.
     *
     * @return {path.sep|*|MONTH_TO_NUM.sep}
     */
    ds: function () {
        return require('path').sep;
    },

    /**
     * Get the directory path converted from dot to slash syntax.
     *
     * @param path string
     * @return string
     */
    dir: function (path) {
        return path.split('.').join(this.ds());
    },

    /**
     * Define the root path.
     *
     * @return string
     */
    root: function () {
        return __dirname.replace('builder/config', '');
    },

    /**
     * Define the base path.
     *
     * @return string
     */
    base: function () {
        return this.root();
    },

    /**
     * Define the resource path.
     *
     * @return string
     */
    resources: function () {
        return this.root() + 'src';
    },

    /**
     * Define the json config path.
     *
     * @return string
     */
    json: function () {
        return this.dir(__dirname.replace('config', 'json.'));
    },

    /**
     * Set the distribution path.
     *
     * @return string
     */
    dist: function () {
        return this.dir(this.base() + '.dist');
    },

    /**
     * Set the node modules path.
     *
     * @return string
     */
    modules: function () {
        return this.dir(this.root() + 'node_modules.');
    },

    /**
     * Set the source path.
     *
     * @return string
     */
    src: function () {
        return this.dir(this.resources());
    },

    /**
     * Read the json configuration.
     *
     * @return obj
     */
    readJson: function (path) {
        return JSON.parse(require('fs').readFileSync(this.json() + path + '.json', 'utf8'));
    },

    /**
     * Get the specific key or keys from the config.
     *
     * @returns {obj}
     */
    get: function () {
        return this.readJson('config');
    },

    /**
     * Set style paths.
     *
     * @return obj
     */
    style: function () {
        var json = this.readJson('sass');

        return {
            src: this.root() + json.src,
            dest: this.root() + json.dest,
            includes: this.root() + json.includes,
            watch: this.dir(this.src() + '.**.') + '*' + this.ext.scss
        };
    },

    /**
     * Set library paths.
     *
     * @return obj
     */
    js: function () {
        var json = this.readJson('js');

        return {
            src: this.root() + json.src,
            dest: this.root() + json.dest,
            watch: this.dir(this.src() + '.**.') + '*' + this.ext.js,
            webpack: this.root() + json.webpack
        };
    },

    /**
     * Available gulp tasks.
     *
     * @return array
     */
    tasks: function () {
        return [
            'browser-sync',
            'js',
            'style',
            'watch'
        ];
    }
};
