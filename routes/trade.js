/**
 * Created by Rachel on 2016. 5. 10..
 */
var express = require('express');
var router = express.Router();
var db = require('../config/db').db();

/* GET home page. */
router.get('/chat', function(req, res, next) {
    res.render('issuer_chat', { title: 'Trade Chat' });
});

/* GET home page. */
router.get('/chat/receiver', function(req, res, next) {
    res.render('receiver_chat', { title: 'Trade Chat' });
});

module.exports = router;
