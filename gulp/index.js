var path = require('path'),
    gulp = require('gulp'),
    _ = require('lodash'),
    util = require('../util');

module.exports = (function () {
    var taskDir = path.join(__dirname, 'tasks');
    _.map(util.getFiles(taskDir), function (file) {
        return {
            name: path.basename(file, '.js'),
            file: require(path.join(taskDir, file))
        };
    }).forEach(function (task) {
        gulp.task(task.name, task.file);
    });
    return gulp;
})();
