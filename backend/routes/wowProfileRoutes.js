const express = require('express');
const router = express.Router();
const attachToken = require('../middleware/attachToken.js');
const WoWApi = require('../blizzard-api/wowapi.js');

router.get('/', attachToken, async (req, res, next) => {
    try {
        const wowapi = new WoWApi(req.token);
        const result = await wowapi.getUserInfo();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
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
