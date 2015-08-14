var request = require('request'),
    Promise = require('bluebird'),
    config = require('../resources/config');

module.exports = function () {
    return new Promise(function (resolve, reject) {
        request({
            method: 'POST',
            headers: { 'content-type' : 'application/x-www-form-urlencoded' },
            url: config.host + '/cas/v1/tickets',
            body: 'username=' + config.username + '&password=' + config.password,
            resolveWithFullResponse: true
        }, function (err, res, body) {
            if (err) reject(err);
            resolve(res);
        });
    });
};
