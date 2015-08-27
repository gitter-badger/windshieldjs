var carsContentPageAdapter = require('../adapters/page/carsContent'),
    carsContentAssocAdapter = require('../adapters/association/carsContent');

module.exports = [

    // Example without ever touching OWCS
    {
        path: '/no-owcs',
        context: {
            target: [ 'example', 'page' ]
        },
        adapters: [ carsContentPageAdapter, carsContentAssocAdapter ]
    }

];
