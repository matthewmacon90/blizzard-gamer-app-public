const express = require('express');
const passport = require('passport');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');

router.get('/', verifyToken, passport.authenticate('bnet'));

router.get('/callback', passport.authenticate('bnet', { failureRedirect: '/' }),
    function(req, res){
        res.redirect('http://localhost:3000/my-profile');
    });




module.exports = router;