
var http = require('http');
var https = require('https');
var request = require('request');

var utils = {

    _requestPost : function(reqOpt, reqData, successCallback, errorCallback) {

        console.log('_request reqData: ' + JSON.stringify(reqData));
        request.post(reqOpt, function(error, response, body) {
            console.log('_request response: ' + JSON.stringify(response));

            if(error) {
                errorCallback(error);
            } else {
                successCallback(body);
            }
        });
    },
    
    _requestGet : function(reqOpt, successCallback, errorCallback) {
        
        request.get(reqOpt, function(error, response, body) {
            console.log('_request response: ' + JSON.stringify(response));

            if (error) {
                errorCallback(error);
            } else {
                successCallback(body);
            }
        });
    }
};

module.exports = utils;