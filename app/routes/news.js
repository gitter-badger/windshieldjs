var owcsPageAdapter = require('../adapters/page/owcs'),
    carsContentAssocAdapter = require('../adapters/association/carsContent');

module.exports = [

    // News
    {
        path: '/news',
        context: {
            webref: 'news'
        },
        adapters: [ owcsPageAdapter, carsContentAssocAdapter ]
    }

];
