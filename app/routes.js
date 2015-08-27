var owcsAdapter = require('./adapters/page/owcs'),
    carsContentAdapter = require('./adapters/association/carsContent');

module.exports = [

    // Homepage
    {
        path: '/',
        context: {
            webref: 'homepage'
        },
        adapters: [ owcsAdapter, carsContentAdapter ]
    },

    // News
    {
        path: '/news',
        context: {
            webref: 'news'
        },
        adapters: [ owcsAdapter, carsContentAdapter ]
    }

];
