var owcsPageAdapter = require('../adapters/page/owcs'),
    carsContentAssocAdapter = require('../adapters/association/carsContent');

module.exports = [

    // News
    {
        path: '/homepage',
        context: {
            webref: 'homepage'
        },
        adapters: [ owcsPageAdapter, carsContentAssocAdapter ]
    }

];
