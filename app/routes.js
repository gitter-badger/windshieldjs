var owcsPageAdapter = require('./adapters/page/owcs'),
    carsContentPageAdapter = require('./adapters/page/carsContent'),
    carsContentAssocAdapter = require('./adapters/association/carsContent');

module.exports = [

    // Homepage
    {
        path: '/',
        context: {
            webref: 'homepage'
        },
        adapters: [ owcsPageAdapter, carsContentAssocAdapter ]
    },

    // News
    {
        path: '/news',
        context: {
            webref: 'news'
        },
        adapters: [ owcsPageAdapter, carsContentAssocAdapter ]
    },

    // Example without ever touching OWCS
    {
        path: '/no-owcs',
        context: {
            target: [ 'example', 'page' ]
        },
        adapters: [ carsContentPageAdapter, carsContentAssocAdapter ]
    }

];
