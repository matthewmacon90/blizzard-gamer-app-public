const express = require('express');
const router = express.Router();
const WoWGuildApi = require('../blizzard-api/WoWGuildApi.js');
const WoWDungeonApi = require('../blizzard-api/wowDungeonApi.js');
const verifyToken = require('../middleware/verifyToken.js');
const {decodeToken} = require('../helpers/jwt-token/jwt.js');

router.get('/', verifyToken, async (req, res, next) => {
    try {
        console.log('req: ', req.query.realmSlug);
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        console.log('DECODED TOKEN: ', decodedToken);
        // const wowDungeonApi = new WoWDungeonApi(decodedToken.btoken);
        // const result = await wowDungeonApi.getDungeons();
        const wowGuildApi = new WoWGuildApi(decodedToken.btoken);
        const result = await wowGuildApi.getGuilds(req.query.realmSlug);
        console.log('RESULT GUILDS ROUTE: ', result);
        return res.status(200).json(result);
    } catch (error) {
        console.log('GUILD ROUTES ERROR', error);
        next(error);
    }
});

module.exports = router;