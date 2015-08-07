var argv = require('minimist')(process.argv.slice(2)),
    memwatch,
    heapdump,
    logger,
    mkdirp,
    tempDir;

if (argv.leaks) {
    memwatch = require('memwatch-next');
    heapdump = require('heapdump');
    mkdirp = require('mkdirp');
    logger = require('./logger');
    tempDir = path.join(__dirname, '..', '..', 'tmp');

    // A leak event will be emitted when heap usage has increased for five consecutive garbage collections
    memwatch.on('leak', function(info) {
        logger.error('Memory leak detected:', info);
        mkdirp(tempDir, function (err) {
            var file = path.join(tempDir, 'windshield-' + process.pid + '-' + Date.now() + '.heapsnapshot');
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
