const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.js');
const {decodeToken} = require('../helpers/jwt-token/jwt.js');
const WoWDungeonApi = require('../blizzard-api/wowDungeonApi.js');
const WoWDungeonModel = require('../models/dungeonModel.js');
const WoWRealmModel = require('../models/realmModel.js');
const WoWLeaderboardModel = require('../models/LeaderboardModel.js');
const {formatLeaderboardData} = require('../blizzard-api/blizzard-helpers/wowhelpers.js');

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

        const leaderboardData = await WoWLeaderboardModel.getLeaderboardByConnectedRealmId(realmData.connected_realm_id);
        const formattedLeaderboardData = formatLeaderboardData(leaderboardData);
        
        if (leaderboardData.length === 0) {
            const wowDungeonApi = new WoWDungeonApi(decodedToken.btoken);
            const dungeonLeaderBoard = await wowDungeonApi.getLeaderBoardIdx(realmData.connected_realm_id);
            return res.status(200).json(dungeonLeaderBoard);
        }

        return res.status(200).json(formattedLeaderboardData);
    } catch (err) {
        console.log('Dungeon Routes ID ERROR', err);
        next(err);
    }
});

module.exports = router;