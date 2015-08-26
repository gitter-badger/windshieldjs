var path = require('path'),
    _ = require('lodash'),
    Hapi = new require('hapi'),
    server = new Hapi.Server();

require('./config/bootstrap')(server);

gulp = require('./gulp');

gulp.task('watch', function() {
    gulp.watch('**/*.js', [ 'test' ]);
});

gulp.task('default', [ 'test' ]);
