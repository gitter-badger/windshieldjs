var request = require('request-promise'),
    Promise = require('bluebird'),
    constructNavigationUrl = require('../functions/constructNavigationUrl'),
    authenticate = require('./authenticate'),
    session = require('../resources/session');

module.exports = function (asset) {
    return new Promise(function (resolve, reject) {
        authenticate().then(function () {
            request({
                headers: {
                    'accept': 'application/json;charset=utf-8',
                    'pragma': 'auth-redirect=false'
                },
                method: 'GET',
                url: constructNavigationUrl(),
                qs: {
                    multiticket: session.ticket
                },
                transform: function (body) {
                    var result;
                    try {
                        return JSON.parse(body);
                    } catch (e) {
                        reject();
                    }
                }
            }).then(resolve).catch(reject);
        });
    });
};
