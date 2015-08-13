var config = require('./resources/config'),
    path = require('path');
config.root = __dirname;
config.requestCache = path.join(config.root, '.request-cache');
module.exports = {
    promises: require('./promises'),
    functions: require('./functions'),
    dao: require('./dao'),
    plugins: require('./plugins'),
    setup: require('./setup'),
    registerPlugin: require('./registerPlugin'),
    resources: require('./resources')
};
