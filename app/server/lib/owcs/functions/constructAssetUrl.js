var data = require('../data');

module.exports = function (asset) {
    return data.config.host + '/cs/REST/sites/www-cars-com/types/' + asset.type + '/assets/' + asset.id;
};
