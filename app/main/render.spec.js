var render = require('./render'),
    Promise = require('bluebird');

describe("render", function () {
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
        expect(render).toEqual(jasmine.any(Function));
    });

    it("returns a function", function () {
        expect(render(mockReply)).toEqual(jasmine.any(Function));
    });

    it("the returned function returns a Promise", function () {
        expect(render(mockReply)(mockData) instanceof Promise).toBe(true);
    });
});
