/**
 * Created by Rachel on 2016. 5. 17..
 */
var db = require('../config/db').db();
var user = require('../config/user');

var tradeUtils = {

    _sumAssets : function(transactions, type, res) {

        var assetList;
        var assetResults = [];

        var existAsset = function(tx) {
            var exist = false;

            assetList.forEach(function(asset) {

               if(asset.assetId == tx.asset_id) {
                   exist = true;
                   var pushCheck = false;

                   assetResults.forEach(function(assetResult) {
                       if(assetResult.assetId == tx.asset_id) {
                           pushCheck = true;
                       }
                   })

                   if(!pushCheck) {
                       assetResults.push({
                           assetId: asset.assetId,
                           assetCode: asset.assetCode,
                           assetName: asset.assetName,
                           amount: 0
                       })
                   }
               }
            });

            return exist;
        };
        
        var calculateAsset = function(tx) {
            console.log('calculateAsset');

            if(tx.category == 'receive') {
                assetResults.forEach(function(assetResult) {
                    if(assetResult.assetId == tx.asset_id) {
                        assetResult.amount = assetResult.amount + tx.asset_quantity;
                    }
                })
            } else {
                assetResult.amount = assetResult.amount - tx.asset_quantity;
            }
        };

        db.collection('assets').find().toArray(function(err, docs) {
            assetList = docs;

            transactions.forEach(function(tx) {
                if(existAsset(tx)) {
                    calculateAsset(tx);
                }
            });

            if(type == 'issuer') {
                res.render('issuer_chat', { title: 'Trade Chat', issuer : user.issuerName, assets : assetResults });
            } else {

                if(user.count > 2) {
                    res.render('error_chat');
                } else {
                    res.render('receiver_chat', { title: 'Trade Chat', issuer : user.issuerName, receiver : user.receiverName, count : user.count, assets : assetResults  });
                }
                
            }

        });
    }

};

module.exports = tradeUtils;