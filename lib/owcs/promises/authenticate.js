var request = require('request-promise'),
    Promise = require('bluebird'),
    requestTicket = require('./requestTicket'),
    requestAuthentication = require('./requestAuthentication'),
    session = require('../resources/session');

module.exports = function () {
    return new Promise(function (resolve, reject) {
        // @TODO: this is temp solution for caching ticket.
        if (!session.ticket) {
            requestTicket()
                .then(requestAuthentication)
                .then(function () {
                    resolve(session.ticket);
                })
                .catch(reject);
        } else {
            resolve();
        }
    });
};
