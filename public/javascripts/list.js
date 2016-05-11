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
        alert('asset1');
        
        $.ajax({
            url: 'localhost:3000/trade/chat/receiver',
            type: 'GET',
            data: {},
            success: function(result) {
            }
        });
    });

});
/**
 * Created by Rachel on 2016. 5. 11..
 */
