var request = require('request-promise'),
    Promise = require('bluebird'),
    constructAssetUrl = require('../functions/constructAssetUrl'),
    authenticate = require('./authenticate'),
    config = require('../resources/config');

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
                resolve(data.assetinfo[0].id);
            }).catch(reject);
        }).catch(reject);
    });
};
