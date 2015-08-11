var argv = require('minimist')(process.argv.slice(2)),
    path,
    memwatch,
    heapdump,
    logger,
    mkdirp,
    tmp;

if (argv.leaks) {
    memwatch = require('memwatch-next');
    heapdump = require('heapdump');
    mkdirp = require('mkdirp');
    logger = require('./logger');
    path = require('path');
    tmp = path.join(__dirname, '..', '..', 'tmp');

    // A leak event will be emitted when heap usage has increased for five consecutive garbage collections
    memwatch.on('leak', function(info) {
        logger.error('Memory leak detected:', info);
        logger.info((process.memoryUsage().heapUsed/1024/1024).toFixed() + 'MB used');
        mkdirp(tmp, function (err) {
            var file = path.join(tmp, 'windshield-' + process.pid + '-' + Date.now() + '.heapsnapshot');
            heapdump.writeSnapshot(file, function (err) {
                if (err) {
                    logger.error(err);
                } else {
                    logger.error('Wrote snapshot:', file);
                }
            });
        });
    });
}
