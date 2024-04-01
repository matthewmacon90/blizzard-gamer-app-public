const express = require('express');
const router = express.Router();
const WoWGuildApi = require('../blizzard-api/WoWGuildApi.js');
const WoWGuildsModel = require('../models/guildsModel.js');
const WoWRealmModel = require('../models/realmModel.js');

const verifyToken = require('../middleware/verifyToken.js');
const {decodeToken} = require('../helpers/jwt-token/jwt.js');

router.get('/', verifyToken, async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        const realm = await WoWRealmModel.getRealmBySlug(req.query.realmSlug);
        
        const guilds = await WoWGuildsModel.getGuildsByRealmId(realm.realm_id);

        //TODO: Implement the WoWGuildApi class to get guild data from Blizzard API
        // const wowGuildApi = new WoWGuildApi(decodedToken.btoken);
        // const result = await wowGuildApi.buildGuildProfile(req.query.realmSlug);

        return res.status(200).json(guilds);
    } catch (error) {
        console.log('GUILD ROUTES ERROR', error);
        next(error);
    }
});

module.exports = router;