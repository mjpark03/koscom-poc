/**
 * Created by Rachel on 2016. 5. 10..
 */
var express = require('express');
var router = express.Router();
var io;

var db = require('../config/db').db();
var util = require('../util/util');
var tradeUtil = require('../util/trade');
var user = require('../config/user');
var api = require('../config/api');
var trade = require('../config/trade');
var scalechain = require('../util/scalechain');



/*
    confirm trade by issuer
 */
var confirmIssuer = function(req, res, next) {

    var assetId = '';

    // 0. get trade data from issuer client
    trade.assetName = req.body.assetName;
    trade.unitPrice = req.body.unitPrice;
    trade.amount = req.body.amount;

    // 1. get asset id by asset code
    db.collection('assets').find({ assetName : trade.assetName }, function (err, list) {
        assetId= list[0].assetId;
        trade.assetCode = list[0].assetCode;

        user.issuer.asset_id = assetId;
        user.issuer.amount = parseInt(trade.amount);
        user.receiver.amount = parseInt(trade.amount);

        // 2. invoke swap (create raw tx)
        scalechain.swapAssets(function(result) {
            trade.unsigned_tx_hex = result.unsigned_tx_hex;

            // 3. invoke sign (issuer)
            scalechain.issuerSignTx(function(result) {

                // 4. update issuerSign
                trade.signed_tx_hex = result.signed_tx_hex;
                db.collection('trade').update({ assetCode : trade.assetCode }, { $set : { issuerSign : 'Y', unitPrice : trade.unitPrice, amount : trade.amount }}, function(err, result) {

                    // 5. alert to receiver for sign
                    io.sockets.emit('receiverSign', {assetName : trade.assetName, unitPrice : trade.unitPrice, amount : trade.amount, issuerName : user.issuerName});
                });
            }, function(error) {
                res.status(500).send({"msg":"fail"});
            })
        }, function(error) {
            res.status(500).send({"msg":"fail"});
        });
    });

    res.status(200).send({"msg":"success"});
};

/*
    confirm trade by receiver
 */
var confirmReceiver = function(req, res, next) {

    // 1. invoke sign (receiver)
    scalechain.receiverSignTx(function(result) {
        trade.final_signed_tx_hex = result.signed_tx_hex;

        // 2. send final signed transaction
        scalechain.sendTransaction(function(result) {

            var updatedAt = util._getFormattedDate();

            // 3. update receiverSign & status
            db.collection('trade').update({assetCode : trade.assetCode}, {$set : {toAddress : user.issuer.to_address, receiverSign : 'Y', status : 2, updatedAt : updatedAt}}, function(err, result) {

                // 4. alert to issuer for complete
                io.sockets.emit('receiverSignComplete', {receiver : user.receiverName, assetName : trade.assetName, unitPrice : trade.unitPrice, amount : trade.amount});
            });
        })

    }, function(error) {
        res.status(500).send({"msg":"fail"});
    })
    res.status(200).send({"msg":"success"});
};

/**
 * router list
 */

router.get('/', function(req, res, next) {

    db.collection('trade').find().toArray(function(err, docs) {
        res.render('index', { title : 'Trade List', list : docs });
    });
});

router.get('/chat', function(req, res, next) {

    user.count = user.count + 1;

    // 1. get access token
    scalechain.getAccessToken(function(result) {
        api.accessToken = JSON.parse(result).access_token;

        // 2. get asset info
        scalechain.getAssetInfo(user.issuer.account_id, function(result) {

            var transactions = JSON.parse(result).transactions;
            tradeUtil._sumAssets(transactions, 'issuer', res);
        }, function(error) {

        });
    }, function(error) { });

});

router.get('/asset', function(req, res, next) {
    var assetCode = req.query.assetCode;

    db.collection('trade').find({assetCode:assetCode}, function (err, list) {
        res.status(200).send({asset : list[0]});
    });
});

router.get('/history', function(req, res, next) {

    user.count = user.count - 1;

    db.collection('trade').find().toArray(function(err, docs) {
        res.render('history', { title : 'Trade History', list : docs });
    });
});

router.get('/chat/receiver', function(req, res, next) {

    user.count = user.count + 1;

    // 1. alert to issuer about receiver join
    if(user.count <= 2) {
        io.sockets.emit('receiverJoin', {receiver : user.receiverName});
    }

    // 2. get asset info
    scalechain.getAssetInfo(user.receiver.account_id, function(result) {

        var transactions = JSON.parse(result).transactions;
        tradeUtil._sumAssets(transactions, 'receiver', res);
    }, function(error) {

    });
});

router.post('/issuer/confirmation', confirmIssuer);
router.post('/receiver/confirmation', confirmReceiver);



module.exports = function(getIOInstance) {
    io = getIOInstance;
    return router;
}
