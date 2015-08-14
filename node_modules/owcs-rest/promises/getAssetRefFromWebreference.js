var request = require('request'),
    Promise = require('bluebird'),
    constructAssetUrl = require('../functions/constructAssetUrl'),
    authenticate = require('./authenticate'),
    config = require('../resources/config'),
    requestAssetsFromRefs = require('./requestAssetsFromRefs'),
    parseAssetData = require('../functions/parseAssetData'),
    _ = require('lodash');

module.exports = function (webreference) {
    return new Promise(function (resolve, reject) {
        authenticate().then(function (ticket) {
            request({
                method: 'GET',
                headers: {
                    'accept': 'application/json;charset=utf-8',
                    'pragma': 'auth-redirect=false'
                },
                url: config.host + '/cs/REST/sites/www-cars-com/types/Page/search',
                qs: {
                    multiticket: ticket,
                    'field:Webreference:wildcard': '*' + webreference + '*'
                },
                json: true
            }, function (err, res, body) {
                if (err) reject(err);
                // TODO: clean this crap up
                requestAssetsFromRefs(_.map(body.assetinfo, _.property('id'))).then(function (data) {
                    var assetData = _.map(data, parseAssetData),
                        assetId;
                    try {
                        assetId = _.filter(assetData, function (v) {
                            return !!_.findWhere(v.attributes.Webreference, { url: webreference });
                        }).pop().id;
                        resolve(assetId);
                    } catch (e) {
                        reject('webreference not found:', webreference);
                    }
                });
            });
        }).catch(reject);
    });
};
