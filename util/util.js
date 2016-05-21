
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
    },

    _getFormattedDate : function formatDate() {
            var date = new Date(),
            month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
};

module.exports = utils;