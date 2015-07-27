var request = require('request-promise'),
    Promise = require('bluebird'),
    session = require('../resources/session');

module.exports = function (response) {
    return new Promise(function (resolve, reject) {
        request({
            headers: { 'content-type' : 'application/x-www-form-urlencoded' },
            method: 'POST',
            url: response.headers.location,
            body: 'service=*',
            resolveWithFullResponse: true
        }).then(function (response) {
            session.ticket = response.body;
            resolve(response);
        }).catch(reject);
    });
};
