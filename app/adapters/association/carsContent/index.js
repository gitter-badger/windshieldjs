var Promise = require('bluebird'),
    carsContent = require('cars-content');

module.exports = function () {
    return new Promise(function (resolve, reject) {
        resolve(carsContent('navigation'));
    });
};
