var config = require(global.configPath),
    mkdirp = require('mkdirp'),
    snapshotInterval = 60 * 1000,
    isDev = (process.env.NODE_ENV !== 'production');

if (isDev) {
    global.wtf = require(config.profiling.wtfPath);
    mkdirp('./profile_data', function (err) {
        if (!err) {
            wtf.trace.prepare({
                'wtf.trace.target': 'file://profile_data/windshield',
                'wtf.trace.provider.dom': false
            });
        }
        wtf.trace.start();
        setTimeout(function tick() {
            wtf.trace.snapshot();
            wtf.trace.reset();
            setTimeout(tick, snapshotInterval);
        }, snapshotInterval);
    });
}

module.exports = {
    scope: function (scopeName, exec) {
        var renderScope;

        if (isDev) {
            renderScope = wtf.trace.enterScope(scopeName);
        }

        exec(function () {
            if (isDev) {
                wtf.trace.leaveScope(renderScope);
            }
        });

    }
};
