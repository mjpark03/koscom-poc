/**
 * Created by Rachel on 2016. 5. 7..
 */

/*jslint browser: true*/
/*global $, io, console, jQuery*/
/*jslint nomen: true*/

$(function() {
    'use strict';
    
    $('#sampleCreateBtn').click(function(e){
        e.preventDefault();

        $.ajax({
            url: '/sample/data',
            dataType: 'json',
            type: 'POST',
            data: {},
            success: function(result) {
                alert(result['msg']);
            }
        });
    });

    $('#sampleReadBtn').click(function(e){
        e.preventDefault();

        $.ajax({
            url: '/sample/data',
            dataType: 'json',
            type: 'GET',
            data: {},
            success: function(result) {
                $('#assetCode').text(result['assetCode']);
                $('#assetName').text(result['assetName']);
                $('#sampleModal').modal();

                /* */
            }
        });
    });

    $('#sampleUpdateBtn').click(function(e){
        e.preventDefault();

        $.ajax({
            url: '/sample/data',
            dataType: 'json',
            type: 'PUT',
            data: {assetName:'국민주택 2013-03'},
            success: function(result) {
                alert(result['msg']);
            }
        });
    });

    $('#sampleDeleteBtn').click(function(e){
        e.preventDefault();

        $.ajax({
            url: '/sample/data',
            dataType: 'json',
            type: 'DELETE',
            data: {},
            success: function(result) {
                alert(result['msg']);
            }
        });
    });
});