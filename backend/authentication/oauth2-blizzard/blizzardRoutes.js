const express = require('express');
const passport = require('passport');
const router = express.Router();
const crypto = require('crypto');

//Would I add link a battlenet account to a user account here?

router.get('/', passport.authenticate('bnet'));

router.get('/callback', passport.authenticate('bnet', { failureRedirect: '/' }),
    function(req, res){
        //Look at how to link battlenet account to user account here.
        // const sessionId = crypto.randomBytes(16).toString('hex');
        // console.log('REQ USER CALL BACK: ', req.user);
        // req.session.user = req.user;
        // res.cookie('sessionId', sessionId, { httpOnly: false, secure: true });
        res.redirect('http://localhost:3000/');
    });

router.get('/wow-user', (req, res, next) => {

});


module.exports = router;