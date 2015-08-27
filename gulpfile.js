var path = require('path'),
    Hapi = new require('hapi');

require('./config/bootstrap')(new Hapi.Server());

gulp = require('./gulp');

gulp.task('watch', function() {
    gulp.watch('**/*.js', [ 'test' ]);
});

gulp.task('default', [ 'test' ]);
