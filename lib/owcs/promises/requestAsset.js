var request = require('request-promise'),
    Promise = require('bluebird'),
    constructAssetUrl = require('../functions/constructAssetUrl'),
    authenticate = require('./authenticate'),
    session = require('../resources/session');

module.exports = function (assetRef) {
    return new Promise(function (resolve, reject) {
        authenticate().then(function () {
            request({
                headers: {
                    'accept': 'application/json;charset=utf-8',
                    'pragma': 'auth-redirect=false'
                },
                method: 'GET',
                url: constructAssetUrl(assetRef),
                qs: {
                    multiticket: session.ticket
                },
                transform: function (body) {
                    try {
                        return JSON.parse(body);
                    } catch (e) {
                        reject(e);
                    }
                }
            }).then(resolve).catch(reject);
        });
    });
};
