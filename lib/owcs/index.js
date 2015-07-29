var _ = require('lodash'),
    config = require('./resources/config'),
    promises = require('./promises'),
    functions = require('./functions'),
    dao = require('./dao'),
    plugins = require('./plugins'),
    configure = require('./configure'),
    registerPlugin = require('./registerPlugin'),
    owcs = {
        promises: promises,
        functions: functions,
        dao: dao,
        plugins: plugins,
        configure: configure,
        registerPlugin: registerPlugin
    };

module.exports = owcs;
