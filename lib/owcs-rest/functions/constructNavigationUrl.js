var config = require('../resources/config');

module.exports = function (asset) {
    return config.host + '/cs/REST/sites/www-cars-com/navigation';
};
