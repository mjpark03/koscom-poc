/**
 * Created by Rachel on 2016. 5. 7..
 */

/*jslint browser: true*/
/*global $, io, console, jQuery*/
/*jslint nomen: true*/

$(function() {
    'use strict';

    var issuer = '손새미';
    var receiver = '이강욱';
    var socket = io();

    /*
        functions related to chatting

        1. sendIssuer
        2. sendReceiver
        ...
    */
    
    var sendIssuer = function() {
        var message = $('#issuerMessage').val();

        socket.emit('issuerChat', {message:message, user:issuer});
        $('#issuerWindow').append($('<p>').text(issuer + ': ' + message));
        $('#issuerMessage').val('');
    };

    var sendReceiver = function() {
        var message = $('#receiverMessage').val();

        socket.emit('receiverChat', {message:message, user:receiver});
        $('#receiverWindow').append($('<p>').text(receiver + ': ' + message));
        $('#receiverMessage').val('');
    };

    $('#issuerSendBtn').click(function(e){
        e.preventDefault();
        sendIssuer();
    });

    $('#issuerMessage').keypress(function(e) {

        if(e.which == 13) {
            e.preventDefault();
            sendIssuer();
        }
    });

    socket.on('receiverChat', function(msg){

        var message = msg.message;
        var user = msg.user;

        $('#issuerWindow').append($('<p>').text(user + ': ' + message));
    });

    $('#receiverSendBtn').click(function(e){
        e.preventDefault();
        sendReceiver();
    });

    $('#receiverMessage').keypress(function(e) {

        if(e.which == 13) {
            e.preventDefault();
            sendReceiver();
        }
    });

    socket.on('issuerChat', function(msg){

        var message = msg.message;
        var user = msg.user;

        $('#receiverWindow').append($('<p>').text(user + ': ' + message));
    });

    socket.on('receiverJoin', function(msg){

        var receiver = msg.receiver;
        $('#issuerUserWindow').append($('<p>').text('참여자 : ' + receiver));
    });



    /*
         functions related to asset confirmation

         ...
     */

    $('#issuerConfirmBtn').click(function(e){
        e.preventDefault();

        var assetName = $('#issuerAssetName').val();
        var unitPrice = $('#issuerUnitPrice').val();
        var amount = $('#issuerAmount').val();

        $('.modal-body #modalAssetName').text(assetName);
        $('.modal-body #modalUnitPrice').text(unitPrice);
        $('.modal-body #modalAmount').text(amount);
        $('#issuerSign').modal('show');
    });

    $('#issuerSignBtn').click(function(e){
        e.preventDefault();

        var assetName = $('#issuerAssetName').val();
        var unitPrice = $('#issuerUnitPrice').val();
        var amount = $('#issuerAmount').val();

        $.ajax({
            url: 'http://ec2-52-193-50-198.ap-northeast-1.compute.amazonaws.com/trade/issuer/confirmation',
            type: 'POST',
            data: {assetName:assetName, unitPrice:unitPrice, amount:amount},
            success: function(result) {

            }
        });
    });

    socket.on('receiverSign', function(msg){

        var assetName = msg.assetName;
        var unitPrice = msg.unitPrice;
        var amount = msg.amount;
        var issuer = msg.issuerName;

        $('.modal-body #modalIssuerName').text(issuer + '님이 제안한 아래의 거래 확정을 위해 사인하세요.');
        $('.modal-body #modalReceiverAssetName').text(assetName);
        $('.modal-body #modalReceiverUnitPrice').text(unitPrice);
        $('.modal-body #modalReceiverAmount').text(amount);
        $('#receiverSign').modal('show');
    });

    $('#receiverSignBtn').click(function(e){
        e.preventDefault();

        $.ajax({
            url: 'http://ec2-52-193-50-198.ap-northeast-1.compute.amazonaws.com/trade/receiver/confirmation',
            type: 'POST',
            data: {},
            success: function(result) {

            }
        });
    });

    socket.on('receiverSignComplete', function(msg){

        var assetName = msg.assetName;
        var unitPrice = msg.unitPrice;
        var amount = msg.amount;
        var receiver = msg.receiver;

        $('.modal-body #modalReceiverName').text('거래 상대 ' + receiver + '님의 사인이 완료되었습니다.');
        $('.modal-body #modalIssuerAssetName').text(assetName);
        $('.modal-body #modalIssuerUnitPrice').text(unitPrice);
        $('.modal-body #modalIssuerAmount').text(amount);
        $('#receiverSignComplete').modal('show');
    });

    $('#issuerExitChat').click(function(e){
        e.preventDefault();
        location.href = '/trade/history';
    });

    $('#receiverExitChat').click(function(e){
        e.preventDefault();
        location.href = '/trade/history';
    });



    /*
     functions related to asset search

     ...
     */

    $('#issuerAssetBtn').click(function(e){
        e.preventDefault();
        $('#issuerAssetInfo').modal('show');
    });

    $('#receiverAssetBtn').click(function(e){
        e.preventDefault();
        $('#receiverAssetInfo').modal('show');
    });
});
