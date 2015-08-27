var Promise = require('bluebird'),
    carsContent = require('cars-content');

module.exports = function () {
    return new Promise(function (resolve, reject) {
        resolve({
            header: carsContent('navigation', 'header'),
            footer: carsContent('navigation', 'footer')
        });
    });
};
