var owcsAdapter = require('./adapters/page/owcs'),
    carsContentAdapter = require('./adapters/association/carsContent');

module.exports = [
    {
        path: '/',
        context: {
            webref: 'homepage'
        },
        adapters: [ owcsAdapter, carsContentAdapter ]
    },
    {
        path: '/news',
        context: {
            webref: 'news'
        },
        adapters: [ owcsAdapter, carsContentAdapter ]
    }
];
