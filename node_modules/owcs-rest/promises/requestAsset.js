var request = require('request'),
    Promise = require('bluebird'),
    constructAssetUrl = require('../functions/constructAssetUrl'),
    authenticate = require('./authenticate');

module.exports = function (assetRef) {
    return new Promise(function (resolve, reject) {
        authenticate().then(function (ticket) {
            request({
                method: 'GET',
                headers: {
                    'accept': 'application/json;charset=utf-8',
                    'pragma': 'auth-redirect=false'
                },
                url: constructAssetUrl(assetRef),
                qs: {
                    multiticket: ticket
                },
                json: true
            }, function (err, res, body) {
                if (err) reject(err);
                resolve(body);
            });
        });
    });
};
