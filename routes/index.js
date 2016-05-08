var express = require('express');
var router = express.Router();
var db = require('../config/db').db();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* */
router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'Express' });
});

/* */
router.get('/history', function(req, res, next) {
  res.render('history', { title: 'Express' });
});

/* */
router.get('/sample', function(req, res, next) {
  res.render('sample', { title: 'Express' });
});

router.route('/sample/data')
    .all(function(req, res, next) {
      // runs for all HTTP verbs first
      // think of it as route specific middleware!
      next();
    })
    .get(function(req, res, next) {
      var assetCode = 'KR1015014320';

      db.collection('sample').find({assetCode:assetCode}, function (err, list) {
        var assetCode = list[0].assetCode;
        var assetName = list[0].assetName;
        res.status(200).send({assetCode:assetCode, assetName:assetName});
      });
    })
    .post(function(req, res, next) {
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
    })
    .put(function(req, res, next) {
      var msg = '데이터 수정에 성공했습니다.';
      var errMsg = '데이터 수정에 오류가 발생했습니다.';

      var assetCode = 'KR1015014320';
      var assetName = req.body.assetName;

      db.collection('sample').update({assetCode:assetCode}, {$set:{assetName:assetName}}, function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send({"msg":errMsg});
        } else {
          res.status(200).send({"msg":msg});
        }
      });
    })
    .delete(function(req, res, next) {
      var msg = '데이터 삭제에 성공했습니다.';
      var errMsg = '데이터 삭제에 오류가 발생했습니다.';

      var assetCode = 'KR1015014320';

      db.collection('sample').find({assetCode:assetCode}, function (err, list) {
        var _id = list[0]._id;
        db.collection('sample').remove({_id:_id}, function (err, result) {
          if (err) {
            console.log(err);
            res.status(500).send({"msg":errMsg});
          } else {
            res.status(200).send({"msg":msg});
          }
        });
      });
      
    });

module.exports = router;
