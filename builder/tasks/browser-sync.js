module.exports = function (gulp, modules, config, reload) {
    /**
     * Define the browser sync initializer.
     *
     * @return object
     */
    gulp.task('browser-sync', function() {
        return modules.browserSync.init({
            proxy: config.gulp.get().browser_sync.proxy_url,
            injectChanges: config.gulp.get().browser_sync.inject_changes
        });
    });
};
