const express = require('express');
const passport = require('passport');
const router = express.Router();

//Would I add link a battlenet account to a user account here?

router.get('/', passport.authenticate('bnet'));

router.get('/callback', passport.authenticate('bnet', { failureRedirect: '/' }),
    function(req, res){
        console.log('REQ USER CALL BACK: ', req.user);
        res.redirect('http://localhost:3000/');
    });


module.exports = router;