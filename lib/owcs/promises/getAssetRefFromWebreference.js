var request = require('request-promise'),
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
                headers: {
                    'accept': 'application/json;charset=utf-8',
                    'pragma': 'auth-redirect=false'
                },
                method: 'GET',
                url: config.host + '/cs/REST/sites/www-cars-com/types/Page/search',
                qs: {
                    multiticket: ticket,
                    'field:Webreference:wildcard': '*' + webreference + '*'
                },
                transform: function (body) {
                    try {
                        return JSON.parse(body);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }).then(function (data) {
                // TODO: clean this crap up
                requestAssetsFromRefs(_.map(data.assetinfo, _.property('id'))).then(function (data) {
                    var assetData = _.map(data, parseAssetData);
                    try {
                        resolve(_.filter(assetData, function (v) {
                            return !!_.findWhere(v.attributes.Webreference, { url: webreference });
                        }).pop().id);
                    } catch (e) {
                        reject('webreference not found');
                    }
                });
            }).catch(reject);
        }).catch(reject);
    });
};
