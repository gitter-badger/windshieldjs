var request = require('request'),
    cachedRequest = require('cached-request')(request),
    Promise = require('bluebird'),
    constructAssetUrl = require('../functions/constructAssetUrl'),
    authenticate = require('./authenticate'),
    config = require('../resources/config');

cachedRequest.setCacheDirectory(config.requestCache);

module.exports = function (assetRef) {
    return new Promise(function (resolve, reject) {
        authenticate().then(function (ticket) {
            cachedRequest({
                method: 'GET',
                headers: {
                    'accept': 'application/json;charset=utf-8',
                    'pragma': 'auth-redirect=false'
                },
                url: constructAssetUrl(assetRef),
                qs: {
                    multiticket: ticket
                },
                json: true,
                ttl: 5 * 60 * 1000 // cache for 5 minutes
            }, function (err, res, body) {
                if (err) reject(err);
                resolve(body);
            });
        });
    });
};
