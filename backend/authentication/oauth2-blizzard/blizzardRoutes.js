const express = require('express');
const passport = require('passport');
const router = express.Router();
const crypto = require('crypto');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', passport.authenticate('bnet'));

router.get('/callback', passport.authenticate('bnet', { failureRedirect: '/' }),
    function(req, res){
        res.redirect('http://localhost:3000/my-profile');
    });

router.get('/wow-user', (req, res, next) => {

});


module.exports = router;