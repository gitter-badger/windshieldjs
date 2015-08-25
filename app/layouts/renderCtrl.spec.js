var renderCtrl = require('./renderCtrl'),
    Promise = require('bluebird');

describe("renderCtrl", function () {
    var mockReply,
        mockData;

    beforeEach(function () {
        mockReply = {
            view: function () {}
        };
        mockData = {
            layout: 'OneColumnPageLayout'
        };
    });

    it("should exist", function () {
        expect(renderCtrl).toEqual(jasmine.any(Function));
    });

    it("returns a function", function () {
        expect(renderCtrl(mockReply)).toEqual(jasmine.any(Function));
    });

    it("the returned function returns a Promise", function () {
        expect(renderCtrl(mockReply)(mockData) instanceof Promise).toBe(true);
    });
});
