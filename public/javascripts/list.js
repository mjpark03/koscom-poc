/**
 * Created by Rachel on 2016. 5. 7..
 */

/*jslint browser: true*/
/*global $, io, console, jQuery*/
/*jslint nomen: true*/

$(function() {
    'use strict';

    $('#asset1').click(function(e){
        e.preventDefault();
        
        $.ajax({
            url: 'localhost:3000/trade/chat/receiver',
            type: 'GET',
            data: {},
            success: function(result) {
            }
        });
    });

});

/* */

var joinTrade = function(assetCode, status) {
    if(status == 1) {
        location.href = '/trade/chat/receiver';
    } else {
        alert('거래가 마감되었습니다.');
    }
};

var getAssetInfo = function(assetCode) {

    $.ajax({
        url: 'http://localhost:3000/trade/asset?assetCode=' + assetCode,
        type: 'GET',
        success: function(result) {

            $('.modal-body #listAssetCode').text(result.asset.assetCode);
            $('.modal-body #listAssetName').text(result.asset.assetName);
            $('.modal-body #listCreatedAt').text(result.asset.createdAt);
            $('.modal-body #listExpiredAt').text(result.asset.expiredAt);
            $('.modal-body #listInterestType').text(result.asset.interestType);
            $('.modal-body #listInterestPeriod').text(result.asset.interestPeriod);
            $('.modal-body #listInterestRate').text(result.asset.interestRate);
            $('.modal-body #listAmount').text(result.asset.amount);
            $('#listAssetDetail').modal('show');
        }
    });
};

var getHistoryAssetInfo = function(assetCode) {

    $.ajax({
        url: 'http://localhost:3000/trade/asset?assetCode=' + assetCode,
        type: 'GET',
        success: function(result) {

            $('.modal-body #historyAssetCode').text(result.asset.assetCode);
            $('.modal-body #historyAssetName').text(result.asset.assetName);
            $('.modal-body #historyCreatedAt').text(result.asset.createdAt);
            $('.modal-body #historyExpiredAt').text(result.asset.expiredAt);
            $('.modal-body #historyInterestType').text(result.asset.interestType);
            $('.modal-body #historyInterestPeriod').text(result.asset.interestPeriod);
            $('.modal-body #historyInterestRate').text(result.asset.interestRate);
            $('.modal-body #historyAmount').text(result.asset.amount);
            $('#historyAssetDetail').modal('show');
        }
    });
};

