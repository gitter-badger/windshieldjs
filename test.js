var Jasmine = require('jasmine'),
    jasmine = new Jasmine(),
    Hapi = new require('hapi');

require('./bootstrap')(new Hapi.Server());

jasmine.loadConfigFile('./config/jasmine.json');

jasmine.onComplete(function (passed) {
    if (passed) {
        console.log('All specs have passed');
    } else {
        console.log('At least one spec has failed');
    }
});

jasmine.execute();
