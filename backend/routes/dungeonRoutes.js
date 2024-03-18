const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.js');
const {decodeToken} = require('../helpers/jwt-token/jwt.js');
const WoWDungeonApi = require('../blizzard-api/wowDungeonApi.js');
const WoWDungeonModel = require('../models/dungeonModel.js');
const WoWRealmModel = require('../models/realmModel.js');

router.get('/', async (req, res, next) => { 
    try{
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);

        // const dungeons = await WoWDungeonModel.getDungeons();

        // if(dungeons.length > 0) return res.status(200).json(dungeons);
        // const realms = await WoWRealmModel.getRealms();

        // if(realms.length > 0) return res.status(200).json(realms);

        const wowDungeonApi = new WoWDungeonApi(decodedToken.btoken);
        const result = await wowDungeonApi.getDungeons();
        return res.status(200).json(result);
    } catch (err) {
        console.log('Dungeon Routes ERROR', err);
        next(err);
    }
});

module.exports = router;