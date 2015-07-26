var Promise = require('bluebird'),
    request = require('request-promise'),
    _ = require('lodash'),
    requestAssetsFromRefs = require('./requestAssetsFromRefs');

module.exports = function (data) {
    return new Promise(function (resolve, reject) {
        var reqUrls = _(data.assetData).filter(function (v){
                return /^CARSNonStockImage:[0-9]{13}$/.test(v.id);
            }).map(function (v) {
                var rtn = {};
                rtn[v.id] = 'http://services-ft.cars.com/MediaInquiryService/1.0/rest/media/' + v.attributes.externalid;
                return rtn;
            }).unique().value(),
            requests,
            a = {};
        reqUrls = _.transform(reqUrls, function (a, v, k) { a[_.keys(v)[0]] = _.values(v)[0]; }, a);

        requests = _.map(reqUrls, function (url) {
            return request({
                method: 'GET',
                headers: {
                    'accept': 'application/json;charset=utf-8',
                    'pragma': 'auth-redirect=false'
                },
                url: url,
                transform: function (body) {
                    var result;
                    try {
                        return JSON.parse(body);
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        });

        Promise.all(requests).then(function (results) {
            data.nonStockImageUrls = _.map(results, function (v) {
                return 'http://lpimages-st.cars.com/stock/1170x1170' + v.media[0].URI;
            });
            resolve(data);
        });

    });
};
