module.exports = function (gulp, modules, config, reload) {
    /**
     * Compile and minify CSS.
     *
     * @return boolean
     */
    gulp.task('style', function () {
        return gulp.src(config.gulp.style().src)
            .on('end', function(){modules.util.log('SASS compilation started.');})
            .pipe(modules.sass({includePaths: config.gulp.style().includes}))
            .on('end', function(){modules.util.log('SASS compilation completed.');})
            .pipe(modules.prefixer('last 2 versions'))
            .pipe(gulp.dest(config.gulp.style().dest))
            .pipe(modules.rename({suffix: '.min'}))
            .pipe(modules.prefixer(
                'last 2 version',
                'safari 5',
                'ie 8',
                'ie 9',
                'opera 12.1',
                'ios 6',
                'android 4'
            ))
            .on('end', function(){modules.util.log('CSS minification started.');})
            .pipe(modules.minifycss({
                compatibility: 'ie8',
                keepBreaks: false,
                keepSpecialComments: 0
            }))
            .on('end', function(){modules.util.log('CSS minification completed.');})
            .pipe(gulp.dest(config.gulp.style().dest));
    });
};
