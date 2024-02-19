const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('bnet'));

router.get('/callback', passport.authenticate('bnet', { failureRedirect: '/' }),
    function(req, res){
        res.redirect('/');
    });


module.exports = router;