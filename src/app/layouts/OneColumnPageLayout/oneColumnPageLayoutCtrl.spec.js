var rewire =  require('rewire'),
    path = require('path'),
    Model = require('./OneColumnPageLayoutModel'),
    Promise = require('bluebird'),
    config = require(global.appConfigPath),
    mockPaths = {
        'OneColumnPageLayout': 'foo/bar',
        'ComponentOne': 'baz/qux',
        'ComponentTwo': 'fizz/buzz',
        //'NotFound': 'app/components/common/NotFound'
        'NotFound': 'fooooo'
    },
    oneColumnPageLayoutCtrl = rewire('./oneColumnPageLayoutCtrl');

oneColumnPageLayoutCtrl.__set__('paths', mockPaths);

describe("oneColumnPageLayoutCtrl", function () {
    var mockReply,
        mockData,
        fs;

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
        fs = oneColumnPageLayoutCtrl.__get__('fs');
        spyOn(fs, 'readFile').and.callFake(function (path, enc, cb) { cb(null, 'success'); });
    });

    it("should exist", function () {
        expect(oneColumnPageLayoutCtrl).toEqual(jasmine.any(Function));
    });

    it("should return a promise", function () {
        expect(oneColumnPageLayoutCtrl(mockReply, mockData) instanceof Promise).toEqual(true);
    });

    it("should make a call to read the partial template file for each item in the main collection", function (done) {
        oneColumnPageLayoutCtrl(mockReply, mockData).finally(function () {
            expect(fs.readFile).toHaveBeenCalled();
            expect(fs.readFile.calls.count()).toEqual(mockData.associations.main.length);
            done();
        });
    });

    it("should eventually call reply.view with template location and layout model", function (done) {
        var mockModel = new Model(mockData);
        spyOn(mockReply, 'view');
        oneColumnPageLayoutCtrl(mockReply, mockData).finally(function () {
            expect(mockReply.view).toHaveBeenCalledWith('foo/bar/OneColumnPageLayoutTemplate', mockModel);
            done();
        });
    });

});
