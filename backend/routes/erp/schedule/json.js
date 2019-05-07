var express = require('express');
var router = express.Router();

var insertIdxIntoBody = require('../../../utils/erp/insertIdxIntoBody');

router.post('/getScheduleList', function (_req, _res) {
    var schedule = require('../../../model/erp/schedule');
    schedule.getScheduleList(_req.body, function (_result) {
        _res.send(_result);
    });
});

module.exports = router;