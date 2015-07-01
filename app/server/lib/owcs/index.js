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

// @WIP
// we need a general parse data / clean up data function that pulls out the
// following fields and cleans them up....
//
// id, name, createdby, createddate, description, subtype, updatedby,
// updateddate, attribute (flatten this!)
function parseAssetData(data) {
    var parsed = _.filter(data, function (v, k) {
        return !!~['id', 'name', 'createdby', 'createddate', 'description', 'subtype', 'updatedby', 'updateddate', 'attribute'].indexOf(k);
    });
    parsed.attributes = _.transform(data.attribute, function (r, v, k) {
        r[v.name] = v.data;
    });
    return parsed;
}

function findAssetAssociations(data) {
    return _.findWhere(data.associations.association, { name: 'assets' }).associatedAsset;
}

module.exports = {
    getAsset: getAsset,
    authenticate: authenticate,
    findAssetAssociations: findAssetAssociations
};
