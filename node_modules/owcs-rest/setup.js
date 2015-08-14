var config = require('./resources/config');

module.exports = function (options) {
    config.host = options.host;
    config.username = options.username;
    config.password = options.password;
};
