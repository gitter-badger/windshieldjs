var request = require('request-promise'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    sessionData = {},
    argv = require('minimist')(process.argv.slice(2));

function getTicket() {
    return new Promise(function (resolve, reject) {
        var ticketRequest = request({
            headers: { 'content-type' : 'application/x-www-form-urlencoded' },
            method: 'POST',
            url: 'http://mgmt-www-ft.cars.com/cas/v1/tickets',
            body: 'username=' + argv.username + '&password=' + argv.password,
            resolveWithFullResponse: true
        });
        ticketRequest.then(function (response) {
            resolve(response.headers.location);
        });
        ticketRequest.catch(reject);
    });
}

function authenticate() {
    return new Promise(function (resolve, reject) {
        getTicket().then(function (ticketUrl) {
            var authRequest = request({
                headers: { 'content-type' : 'application/x-www-form-urlencoded' },
                method: 'POST',
                url: ticketUrl,
                body: 'service=*',
                resolveWithFullResponse: true
            });
            authRequest.then(function (response) {
                sessionData.ticket = response.body;
                resolve();
            });
            authRequest.catch(reject);
        });
    });
}

function getAsset(assetType, assetId) {
    return new Promise(function (resolve, reject) {
        authenticate().then(function (body) {
            var assetRequest = request({
                headers: {
                    'accept': 'application/json;charset=utf-8',
                    'pragma': 'auth-redirect=false'
                },
                method: 'GET',
                url: 'http://mgmt-www-ft.cars.com/cs/REST/sites/www-cars-com/types/' + assetType + '/assets/' + assetId,
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
            });
            assetRequest.then(resolve);
            assetRequest.catch(reject);
        });

    });
}

function findAssetAssociations(assoc) {
    return _.findWhere(assoc, { name: 'assets' }).associatedAsset;
}

function transformAttributes (attr) {
    var r = {};
    _.forEach(attr, function (v) {
        r[v.name] = v.data;
    });
    return r;
}

function parseAssetData(data) {
    var parsed = {};
    parsed.id = data.id;
    parsed.name = data.name;
    parsed.createdby = data.createdby;
    parsed.createddate = data.createddate;
    parsed.description = data.description;
    parsed.subtype = data.subtype;
    parsed.updatedby = data.updatedby;
    parsed.updateddate = data.updateddate;
    parsed.attributes = transformAttributes(data.attribute);
    parsed.associatedAssets = findAssetAssociations(data.associations.association);
    return parsed;
}


module.exports = {
    getAsset: getAsset,
    authenticate: authenticate,
    findAssetAssociations: findAssetAssociations,
    transformAttributes: transformAttributes,
    parseAssetData: parseAssetData
};
