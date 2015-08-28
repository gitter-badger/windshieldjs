var path = require('path'),
    Hapi = new require('hapi'),
    server = new Hapi.Server();

require('./bootstrap')(server);
require('./app/router')(server);

gulp = require('./gulp');

gulp.task('watch', function() {
    gulp.watch('**/*.js', [ 'test' ]);
});

gulp.task('default', [ 'test' ]);
