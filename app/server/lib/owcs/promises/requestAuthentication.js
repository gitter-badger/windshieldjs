var request = require('request-promise'),
    Promise = require('bluebird'),
    data = require('../data');

module.exports = function (response) {
    return new Promise(function (resolve, reject) {
        request({
            headers: { 'content-type' : 'application/x-www-form-urlencoded' },
            method: 'POST',
            url: response.headers.location,
            body: 'service=*',
            resolveWithFullResponse: true
        }).then(function (response) {
            data.session.ticket = response.body;
            resolve(response);
        }).catch(reject);
    });
};
