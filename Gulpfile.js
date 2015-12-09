var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    url = require('url'),
    proxy = require('proxy-middleware');
gulp.task('browserSync', function () {
    var proxyOptions = url.parse('http://localhost:6650/api/');
    proxyOptions.route = '/api';
    browserSync({
        open:true,
        port:8000,
        server: {
            baseDir: 'app',
            middleware:[proxy(proxyOptions)]
        },
    })
})

gulp.task('watch', function () {
    gulp.watch(['app/**/*.js','app/**/*.html','app/**/*.css'], browserSync.reload);
});

gulp.task('default', ['browserSync','watch'], function () {

});
