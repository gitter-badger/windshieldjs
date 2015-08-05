var request = require('request-promise'),
    config = require('../resources/config');

module.exports = function () {
    return request({
        headers: { 'content-type' : 'application/x-www-form-urlencoded' },
        method: 'POST',
        url: config.host + '/cas/v1/tickets',
        body: 'username=' + config.username + '&password=' + config.password,
        resolveWithFullResponse: true
    });
};
