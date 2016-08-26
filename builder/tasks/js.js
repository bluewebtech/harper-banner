module.exports = function (gulp, modules, config, reload) {
    /**
     * Compile, minify and pack up all javascript source.
     *
     * @return boolean
     */
    gulp.task('js', function () {
        return gulp.src(config.gulp.js().src)
            .pipe(modules.webpack(require(config.gulp.js().webpack)))
            .pipe(gulp.dest(config.gulp.js().dest));
    });
};
