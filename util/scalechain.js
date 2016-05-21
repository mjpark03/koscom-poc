/**
 * Created by Rachel on 2016. 5. 17..
 */
var api = require('../config/api');
var user = require('../config/user');
var trade = require('../config/trade');
var util = require('./util');

var scalechain = {

    /*
     get access token for using scalechain APIs
     */
    getAccessToken : function(successCallback, errorCallback) {

        var apiKey = api.key;
        var apiSecret = api.secret;
        var auth = new Buffer(apiKey + ':' + apiSecret).toString('base64');

        var reqData = {
            'grant_type' : 'client_credentials'
        };

        var reqOpt = {
            url : api.host + "/v1/oauth2/token",
            method: "POST",
            form : reqData,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + auth
            }
        };

        util._requestPost(reqOpt, reqData, successCallback, errorCallback);
    },

    swapAssets : function(successCallback, errorCallback) {

        var reqData = {
            'originator' : user.issuer,
            'participant' : user.receiver
        };

        var reqOpt = {
            url : api.host + "/v1/assets/swap",
            method: "POST",
            json : reqData,
            headers : {
                'Content-Type' : 'application/json',
                'network' : 'testnet',
                'Authorization' : 'Bearer ' + api.accessToken
            }
        };

        util._requestPost(reqOpt, reqData, successCallback, errorCallback);
    },

    issuerSignTx : function(successCallback, errorCallback) {

        var reqData = {
            'unsigned_tx_hex' : trade.unsigned_tx_hex,
            'account_id' : user.issuer.account_id
        };

        var reqOpt = {
            url : api.host + "/v1/transactions/sign",
            method: "POST",
            json : reqData,
            headers : {
                'Content-Type' : 'application/json',
                'network' : 'testnet',
                'Authorization' : 'Bearer ' + api.accessToken
            }
        };

        util._requestPost(reqOpt, reqData, successCallback, errorCallback);
    },

    issuerSignTxWithPrivKey : function(successCallback, errorCallback) {

        var reqData = {
            'unsigned_tx_hex' : trade.unsigned_tx_hex
        };

        var reqOpt = {
            url : api.host + "/v1/transactions/sign",
            method: "POST",
            json : reqData,
            headers : {
                'Content-Type' : 'application/json',
                'network' : 'testnet',
                'Authorization' : 'Bearer ' + api.accessToken
            }
        };

        util._requestPost(reqOpt, reqData, successCallback, errorCallback);
    },

    receiverSignTx : function(successCallback, errorCallback) {

        var reqData = {
            'unsigned_tx_hex' : trade.signed_tx_hex,
            'account_id' : user.receiver.account_id
        };

        var reqOpt = {
            url : api.host + "/v1/transactions/sign",
            method: "POST",
            json : reqData,
            headers : {
                'Content-Type' : 'application/json',
                'network' : 'testnet',
                'Authorization' : 'Bearer ' + api.accessToken
            }
        };

        util._requestPost(reqOpt, reqData, successCallback, errorCallback);
    },

    receiverSignTxWithPrivKey : function(successCallback, errorCallback) {

        var reqData = {
            'unsigned_tx_hex' : trade.signed_tx_hex
        };

        var reqOpt = {
            url : api.host + "/v1/transactions/sign",
            method: "POST",
            json : reqData,
            headers : {
                'Content-Type' : 'application/json',
                'network' : 'testnet',
                'Authorization' : 'Bearer ' + api.accessToken
            }
        };

        util._requestPost(reqOpt, reqData, successCallback, errorCallback);
    },

    sendTransaction : function(successCallback, errorCallback) {

        var reqData = {
            'signed_tx_hex' : trade.final_signed_tx_hex,
        };

        var reqOpt = {
            url : api.host + "/v1/transactions/send",
            method: "POST",
            json : reqData,
            headers : {
                'Content-Type' : 'application/json',
                'network' : 'testnet',
                'Authorization' : 'Bearer ' + api.accessToken
            }
        };

        util._requestPost(reqOpt, reqData, successCallback, errorCallback);
    },

    getAssetInfo : function(accountId, successCallback, errorCallback) {

        var reqOpt = {
            url : api.host + "/v1/accounts/" + accountId + "/show",
            method: "GET",
            headers : {
                'network' : 'testnet',
                'Authorization' : 'Bearer ' + api.accessToken
            }
        };

        util._requestGet(reqOpt, successCallback, errorCallback);
    }
}

module.exports = scalechain;