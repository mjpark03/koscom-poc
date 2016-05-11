/**
 * Created by Rachel on 2016. 5. 7..
 */

/*jslint browser: true*/
/*global $, io, console, jQuery*/
/*jslint nomen: true*/

$(function() {
    'use strict';

    var socket = io();

    var sendIssuer = function() {
        var message = $('#issuerMessage').val();
        var user = '게시자A';

        socket.emit('issuerChat', {message:message, user:user});
        $('#issuerWindow').append($('<p>').text(user + ': ' + message));
        $('#issuerMessage').val('');
    };

    var sendReceiver = function() {
        var message = $('#receiverMessage').val();
        var user = '참여자B';

        socket.emit('receiverChat', {message:message, user:user});
        $('#receiverWindow').append($('<p>').text(user + ': ' + message));
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
    
});
