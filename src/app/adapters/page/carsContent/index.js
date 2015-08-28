var Promise = require('bluebird'),
    carsContent = require('cars-content');

module.exports = function (context) {
    return new Promise(function (resolve, reject) {
        resolve(carsContent.apply(this, context.target));
    });
};
