const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/usersModel.js');

router.get('/', passport.authenticate('bnet'));

router.get('/callback', passport.authenticate('bnet', { failureRedirect: '/' }),
    async function(req, res){
        try{
            console.log('REQ USER: ', req.user);

            const { id, battletag, accessToken } = req.user;
            const result = await User.getUserByBattleTag(battletag);

            if(result) {
                await User.linkBattleTag(id, battletag, accessToken);
            }
            res.redirect('http://localhost:3000/my-profile');
        } catch (err) {
            console.error(err);
        }
    });

module.exports = router;
