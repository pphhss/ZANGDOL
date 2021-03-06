var dbFacade = require('../../DB/DBFacade');
var config = require('../../config').fcm
exports.addAnimal = function (_req, _data, _callback, _testCallback) {

    if (_req.file) // 이미지 파일이 있을 때만 url_picture 설정
        _req.body.url_picture = _req.file.destination + _req.file.filename;

    var find = require('../android/find/find');
    dbFacade.addAnimal(_data, function (_idx) {
        if (typeof _testCallback == 'function')
            _testCallback(_idx)

        var res = { result: 1 };
        _callback(res);
        find.matchingFind({
            mode:config.mode.ANIMALFIND,
            idx:_idx,
            date: new Date(require('../../utils/date')()),
            latitude: _data.discovered_spot_latitude,
            longitude: _data.discovered_spot_longitude,
            species_code: _data.species_code,
            sex: _data.sex
        }, function () { })
    });
};

exports.getAnimalList = function (_data, _callback) {
    dbFacade.getAnimalList(_data, function (_results) {
        var res = {};
        res.result = 1;
        res.list = _results;
        _callback(res);
    })
}

exports.getAnimalListPage = function (_data, _callback) {
    dbFacade.getAnimalListPage(_data, function (_results) {
        var res = {};
        res.result = 1;
        res.totalPage = _results;
        _callback(res);
    });
}

exports.getAnimal = function (_data, _callback) {
    dbFacade.getAnimal(_data, function (_results) {
        var res = {};
        res.result = 1;
        res.animal = _results[0];
        _callback(res);
    });
}

exports.updateAnimal = function (_req, _data, _callback) {
    if (_req.file) // 이미지 파일이 있을 때만 url_picture 설정
        _req.body.url_picture = _req.file.destination + _req.file.filename;

    var idx = _data.animal_idx;
    delete _data.animal_idx;
    dbFacade.updateAnimal(_data, idx, function () {
        var res = {};
        res.result = 1;
        _callback(res);
    });
}