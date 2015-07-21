var request = require('request-promise'),
    argv = require('minimist')(process.argv.slice(2)),
    data = require('../data');

module.exports = function () {
    return request({
        headers: { 'content-type' : 'application/x-www-form-urlencoded' },
        method: 'POST',
        url: data.config.host + '/cas/v1/tickets',
        body: 'username=' + argv.username + '&password=' + argv.password,
        resolveWithFullResponse: true
    });
};
