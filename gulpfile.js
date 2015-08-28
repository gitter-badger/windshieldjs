var path = require('path'),
    Hapi = new require('hapi'),
    server = new Hapi.Server();

require('./src/bootstrap')(server);
require('./src/app/router')(server);

gulp = require('./gulp');

gulp.task('build', [ 'clean', 'package' ]);

gulp.task('watch', function() {
    gulp.watch('**/*.js', [ 'test' ]);
});

gulp.task('default', [ 'test' ]);
