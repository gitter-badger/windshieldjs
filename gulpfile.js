var path = require('path'),
    Hapi = new require('hapi'),
    server = new Hapi.Server(),
    gulpSequence = require('gulp-sequence');

require('./src/bootstrap')(server);
require('./src/app/router')(server);

gulp = require('./gulp');

gulp.task('build', gulpSequence('clean', 'package'));

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', [ 'test' ]);
});

gulp.task('default', gulpSequence('test', 'build'));
