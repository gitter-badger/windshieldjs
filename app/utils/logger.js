var winston = require('winston'),
    config = require(global.configPath),
    path = require('path');

module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            name: 'info-log',
            filename: path.join(config.appRoot, 'logs', 'info.log'),
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-log',
            filename: path.join(config.appRoot, 'logs', 'error.log'),
            level: 'error'
        })
    ]
});
