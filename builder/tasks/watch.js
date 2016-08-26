module.exports = function (gulp, modules, config, reload) {
    /**
     * The default gulp watcher.
     *
     * @return void
     */
    gulp.task('default', ['browser-sync'], function () {
        console.log(config.gulp.root() + 'src/**/*.*');
        console.log(config.gulp.js().watch);
        gulp.watch([config.gulp.style().watch], ['style']);
        gulp.watch([config.gulp.js().watch], ['js']);
        gulp.watch(config.gulp.root() + 'src/**/*.*', function(){
            modules.browserSync.reload();
        });
    });
};
