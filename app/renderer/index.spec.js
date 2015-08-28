var renderer = require('./index'),
    Promise = require('bluebird');

describe("renderer", function () {
    var mockReply,
        mockData;

    beforeEach(function () {
        mockReply = {
            view: function () {}
        };
        mockData = {
            layout: 'OneColumnPageLayout',
            associations: {
                main: [
                    {
                        component: 'ComponentOne',
                        partial: 'componentOne123'
                    },
                    {
                        component: 'ComponentTwo',
                        partial: 'componentTwo123'
                    }
                ]
            }
        };
    });

    it("should exist", function () {
        expect(renderer).toEqual(jasmine.any(Function));
    });

    it("returns a function", function () {
        expect(renderer(mockReply)).toEqual(jasmine.any(Function));
    });

    it("the returned function returns a Promise", function () {
        expect(renderer(mockReply)(mockData) instanceof Promise).toBe(true);
    });
});
