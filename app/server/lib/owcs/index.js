var request = require('request-promise'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    sessionData = {},
    argv = require('minimist')(process.argv.slice(2));

function getTicket() {
    return new Promise(function (resolve, reject) {
        request({
            headers: { 'content-type' : 'application/x-www-form-urlencoded' },
            method: 'POST',
            url: 'http://mgmt-www-ft.cars.com/cas/v1/tickets',
            body: 'username=' + argv.username + '&password=' + argv.password,
            resolveWithFullResponse: true
        }).then(function (response) {
            resolve(response.headers.location);
        }).catch(reject);
    });
}

function makeAuthRequest(ticketUrl) {
    return new Promise(function (resolve, reject) {
        request({
            headers: { 'content-type' : 'application/x-www-form-urlencoded' },
            method: 'POST',
            url: ticketUrl,
            body: 'service=*',
            resolveWithFullResponse: true
        }).then(function (response) {
            sessionData.ticket = response.body;
            resolve();
        }).catch(reject);
    });
}

function authenticate() {
    return new Promise(function (resolve, reject) {
        // @TODO: this is temp solution for caching ticket.
        if (!sessionData.ticket) {
            getTicket()
                .then(makeAuthRequest)
                .then(resolve)
                .catch(reject);
        } else {
            resolve();
        }
    });
}

function constructAssetUrl(asset) {
    return 'http://mgmt-www-ft.cars.com/cs/REST/sites/www-cars-com/types/' + asset.type + '/assets/' + asset.id;
}

function parseAssetRef(assetRef) {
    var parsed = {},
        assetParts = assetRef.split(':');
    parsed.type = assetParts[0];
    parsed.id = assetParts[1];
    return parsed;
}

function getAsset(asset) {
    return new Promise(function (resolve, reject) {
        authenticate().then(function () {
            request({
                headers: {
                    'accept': 'application/json;charset=utf-8',
                    'pragma': 'auth-redirect=false'
                },
                method: 'GET',
                url: constructAssetUrl(asset),
                qs: {
                    multiticket: sessionData.ticket
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
}

function assignProperty(target, source, prop) {
    if (source[prop]) target[prop] = source[prop];
    return target;
}

function _transformAttributes (attributes) {
    var r = {};
    _.forEach(attributes, function (v) {
        if (v.data) {
            if (v.data.stringValue) r[v.name] = v.data.stringValue;
            if (v.data.longValue) r[v.name] = v.data.longValue;
            if (v.data.listValue) r[v.name] = _.map(v.data.listValue.item, function (i) {
                return _transformAttributes(i.item);
            });
            if (v.data.webreferenceList) r[v.name] = v.data.webreferenceList;
        }
    });
    return r;
}

function _findAssetAssociations(associationData) {
    var assetsData = _.findWhere(associationData, { name: 'assets' });
    return (typeof assetsData === 'object') ? assetsData.associatedAsset || [] : [];
}

function _parseAssetData(data) {
    var parsed = {};
    assignProperty(parsed, data, 'id');
    assignProperty(parsed, data, 'name');
    assignProperty(parsed, data, 'createdby');
    assignProperty(parsed, data, 'createddate');
    assignProperty(parsed, data, 'description');
    assignProperty(parsed, data, 'subtype');
    assignProperty(parsed, data, 'updatedby');
    assignProperty(parsed, data, 'updateddate');
    parsed.attributes = _transformAttributes(data.attribute);
    if (data.associations) parsed.associatedAssets = _findAssetAssociations(data.associations.association);
    return parsed;
}

function parseAssetData(data) {
    return new Promise(function (resolve, reject) {
        resolve(_parseAssetData(data));
    });
}

function getAssetsDataFromRefs(assetRefs) {
    return Promise.all(assetRefs.map(function (assetid) {
        return getAsset(parseAssetRef(assetid));
    }));
}

function addAssetsDataToParsed(parsed) {
    return new Promise(function (resolve, reject) {
        getAssetsDataFromRefs(parsed.associatedAssets || []).then(function (assetsData) {
            parsed.associatedAssetsData = _.map(assetsData, _parseAssetData);
            resolve(parsed);
        }).catch(reject);
    });
}

function addManualrecsDataToParsed(parsed) {
    return new Promise(function (resolve, reject) {
        Promise.all(_.map(parsed.associatedAssetsData, _.flow(_.property('attributes.Manualrecs'), _.partialRight(_.map, 'assetid'))).map(function (v) {
            return getAssetsDataFromRefs(v);
        })).then(function (allManualRecData) {
            _.forEach(allManualRecData, function (v, i) {
                var attrs = parsed.associatedAssetsData[i].attributes;
                if (attrs.Manualrecs) attrs.ManualrecsData = _.map(v, _parseAssetData);
            });
            resolve(parsed);
        }).catch(reject);
    });
}

function getAssetWithAssociated(asset) {
    return getAsset(asset)
        .then(parseAssetData)
        .then(addAssetsDataToParsed)
        .then(addManualrecsDataToParsed);
}

module.exports = {
    authenticate: authenticate,
    getAsset: getAsset,
    getAssetsDataFromRefs: getAssetsDataFromRefs,
    getAssetWithAssociated: getAssetWithAssociated
};
