var config = require('../../config.json'),
    mkdirp = require('mkdirp');

if (config.profile) {
    global.wtf = require(config.profiling.wtfPath);
    mkdirp('./profile_data', function (err) {
        if (!err) {
            wtf.trace.prepare({
                'wtf.trace.target': 'file://profile_data/windshield',
                'wtf.trace.provider.dom': false
            });
        }
        wtf.trace.start();
    });
}

module.exports = {
    scope: function (scopeName, exec, context) {
        var renderScope;

        context = (context != null) ? context : this;

        if (config.profile) {
            wtf.trace.reset();
            renderScope = wtf.trace.enterScope(scopeName);
        }

        exec.call(context, function () {
            if (config.profile) {
                wtf.trace.leaveScope(renderScope);
                wtf.trace.snapshot();
            }
        });

    }
};
