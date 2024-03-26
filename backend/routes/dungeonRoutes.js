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
        const wowDungeonApi = new WoWDungeonApi(decodedToken.btoken);
        const result = await wowDungeonApi.getDungeons();
        return res.status(200).json(result);
    } catch (err) {
        console.log('Dungeon Routes ERROR', err);
        next(err);
    }
});

router.get('/:realmId', async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        const realmData = await WoWRealmModel.getRealmById(req.params.realmId);

        const wowDungeonApi = new WoWDungeonApi(decodedToken.btoken);
        const dungeonLeaderBoard = await wowDungeonApi.getLeaderBoardIdx(realmData.connected_realm_id);
        return res.status(200).json(dungeonLeaderBoard);
    } catch (err) {
        console.log('Dungeon Routes ERROR', err);
        next(err);
    }
});

module.exports = router;