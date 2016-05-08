/**
 * Created by Rachel on 2016. 5. 7..
 */
var express = require('express');
var router = express.Router();
var db = require('../config/db').db();

module.exports = (function () {

    var api = {

        v1 : {
            insertSampleData : function (req, res, next) {

                var msg = '새로운 데이터 생성에 성공했습니다.';
                var errMsg = '새로운 데이터 생성에 오류가 발생했습니다.';

                var assetCode = 'KR1015014320';
                var assetName = '국민주택 2013-02';
                var issueDate = new Date();

                db.collection('sample').save({assetCode:assetCode, assetName:assetName, issueDate:issueDate}, function(err) {
                    if (err) {
                        res.status(500).send({"msg":errMsg});
                    } else {
                        res.status(200).send({"msg":msg});
                    }
                })
            }
        },

        init : function () {
            router.post('/create', api.v1.insertSampleData);
        }
    };

    return {
        api : api,
        router : router
    };
    
}) ();