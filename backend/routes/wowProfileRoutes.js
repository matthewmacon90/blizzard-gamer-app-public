const express = require('express');
const router = express.Router();
const attachToken = require('../middleware/attachToken.js');
const WoWApi = require('../blizzard-api/wowApi.js');
const verifyToken = require('../middleware/verifyToken.js');
const {decodeToken} = require('../helpers/jwt-token/jwt.js');

router.get('/', verifyToken, async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        console.log('DECODED TOKEN: ', decodedToken);
        const wowapi = new WoWApi(decodedToken.btoken, decodedToken.id);
        const result = await wowapi.getUserProfile();
        return res.status(200).json(result);
    } catch (error) {
        console.log('WOW PROFILE ROUTES ERROR', error);
        next(error);
    }
});

router.get('/character/:realm/:characterName', attachToken, async (req, res, next) => {
    try {
        const {realm, characterName} = req.params;
        const wowapi = new WoWApi(req.token);
        const result = await wowapi.getCharacterProfile(realm, characterName);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }

    //Route is not working at the moment.
    router.get('/guild/:realm/:guildname', attachToken, async (req, res, next) => {
        try {
            const {realm, guildname} = req.params;
            const wowapi = new WoWApi(req.token);
            const result = await wowapi.getGuildProfile(realm, guildname);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            next(error);
        }
    });
});


module.exports = router;
