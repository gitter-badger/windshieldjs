var Promise = require('bluebird'),
    request = require('request-promise'),
    _ = require('lodash'),
    requestAssetsFromRefs = require('./requestAssetsFromRefs');

module.exports = function (data) {
    return new Promise(function (resolve, reject) {
        var assetRefs = _(data.assetData).filter(function (v){
                return /^CARSNonStockImage:[0-9]{13}$/.test(v.id);
            }),
            reqUrls = _(assetRefs).map(function (v) {
                var rtn = {};
                rtn[v.id] = 'http://services-ft.cars.com/MediaInquiryService/1.0/rest/media/' + v.attributes.externalid;
                return rtn;
            }),
            requests,
            a = {};

        reqUrls = _.transform(_(reqUrls).unique().value(), function (a, v, k) { a[_.keys(v)[0]] = _.values(v)[0]; }, a);

        requests = _.map(reqUrls, function (url, assetRef) {
            return new Promise(function (resolve, reject) {
                request({
                    method: 'GET',
                    headers: {
                        'accept': 'application/json;charset=utf-8',
                        'pragma': 'auth-redirect=false'
                    },
                    url: url,
                    transform: function (body) {
                        try {
                            resolve([ assetRef, JSON.parse(body) ]);
                        } catch (e) {
                            reject(e);
                        }
                    }
                });
            });
        });

        Promise.all(requests).then(function (mediaData) {
            data.nonStockImageUrls = {};
            _.forEach(mediaData, function (v) {
                data.nonStockImageUrls[v[0]] = 'http://lpimages-st.cars.com/stock/1170x1170' + v[1].media[0].URI;
            });
            resolve(data);
        }).catch(reject);

    });
};
