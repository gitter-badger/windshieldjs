var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    Hapi = new require('hapi'),
    server = new Hapi.Server();

require('./config/bootstrap')(server);

gulp.task('test', function () {
    return gulp.src('./app/**/*.spec.js')
       .pipe(jasmine());
});

gulp.task('default', [ 'test' ]);
