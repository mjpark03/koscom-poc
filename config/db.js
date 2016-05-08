var mongojs = require('mongojs');

var db = mongojs('KOSCOM_POC');

exports.db = function() {
    return db
}