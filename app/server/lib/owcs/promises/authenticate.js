var request = require('request-promise'),
    Promise = require('bluebird'),
    requestTicket = require('./requestTicket'),
    requestAuthentication = require('./requestAuthentication'),
    data = require('../data');

module.exports = function () {
    return new Promise(function (resolve, reject) {
        // @TODO: this is temp solution for caching ticket.
        if (!data.session.ticket) {
            requestTicket()
                .then(requestAuthentication)
                .then(resolve)
                .catch(reject);
        } else {
            resolve();
        }
    });
};
