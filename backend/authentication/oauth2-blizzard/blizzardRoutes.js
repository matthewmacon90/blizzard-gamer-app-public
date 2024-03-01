const express = require('express');
const passport = require('passport');
const router = express.Router();
const { signToken } = require('../../helpers/jwt-token/jwt');


router.get('/', passport.authenticate('bnet'));

router.get('/callback', passport.authenticate('bnet', { failureRedirect: '/' }),
    async function(req, res){
        console.log('req.user: ', req.user);
        const { id, battletag, accessToken } = req.user;
        const blizzardToken = await signToken({id, battletag, accessToken});
        console.log('blizzardToken: ', blizzardToken);

        res.redirect('http://localhost:3000/my-profile')
    });




module.exports = router;