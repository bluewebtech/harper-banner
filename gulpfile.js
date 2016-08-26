/**
 * Gulp task runner.
 *
 * In a terminal window within the root of the client project run any of the
 * following available Gulp tasks.
 */

/**
 * ------------------------------------
 * Gulp It Up!
 * ------------------------------------
 */
var gulp = require('gulp'),
    build = {
        config: {
            gulp: './builder/config/gulp',
            webpack: './builder/config/webpack'
        },
        tasks: './builder/tasks/'
    },

    /**
     * Load the gulp modules.
     *
     * @var object
     */
    modules = {
        browserSync: require('browser-sync').create(),
        concat: require('gulp-concat'),
        es: require('event-stream'),
        fs: require('fs'),
        minifycss: require('gulp-minify-css'),
        order: require('gulp-order'),
        path: require('path'),
        prefixer: require('gulp-autoprefixer'),
        rename: require('gulp-rename'),
        rs: require('run-sequence'),
        sass: require('gulp-sass'),
        uglify: require('gulp-uglify'),
        util: require('gulp-util'),
        webpack: require('gulp-webpack')
    },

    /**
     * Define the gulp configuration.
     *
     * @var string
     */
    config = {
        gulp: require(build.config.gulp)
    },

    /**
     * Define the browser sync reload instance.
     *
     * @var object
     */
    reload = modules.browserSync.reload
;

/**
 * Load all tasks.
 */
for (i = 0; i < config.gulp.tasks().length; i++) {
    require(build.tasks + config.gulp.tasks()[i])(gulp, modules, config, reload);
}
