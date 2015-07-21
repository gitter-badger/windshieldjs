var request = require('request-promise'),
    Promise = require('bluebird'),
    makeTicketRequest = require('./makeTicketRequest'),
    makeAuthRequest = require('./makeAuthRequest'),
    data = require('../data');

module.exports = function () {
    return new Promise(function (resolve, reject) {
        // @TODO: this is temp solution for caching ticket.
        if (!data.session.ticket) {
            makeTicketRequest()
                .then(makeAuthRequest)
                .then(resolve)
                .catch(reject);
        } else {
            resolve();
        }
    });
};
