var gulp = require('gulp'),
    Jasmine = require('jasmine'),
    jasmine = new Jasmine(),
    gulpJasmine = require('gulp-jasmine'),
    Hapi = new require('hapi');

require('./bootstrap')(new Hapi.Server());

jasmine.loadConfigFile('./config/jasmine.json');

jasmine.onComplete(function (passed) {
    if (passed) {
        console.log('All specs have passed');
    } else {
        console.log('At least one spec has failed');
    }
});

gulp.task('test', function () {
    return gulp.src('./app/**/*.spec.js')
       .pipe(gulpJasmine());
});

gulp.task('default', [ 'test' ]);

