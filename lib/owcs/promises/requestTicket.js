var request = require('request-promise'),
    argv = require('minimist')(process.argv.slice(2)),
    config = require('../resources/config');

module.exports = function () {
    return request({
        headers: { 'content-type' : 'application/x-www-form-urlencoded' },
        method: 'POST',
        url: config.host + '/cas/v1/tickets',
        body: 'username=' + argv.username + '&password=' + argv.password,
        resolveWithFullResponse: true
    });
};
