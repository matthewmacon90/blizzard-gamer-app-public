const express = require('express');
const router = express.Router();
const {decodeToken} = require('../helpers/jwt-token/jwt.js');
const WoWRealmApi = require('../blizzard-api/wowRealmApi.js');
const WoWRealmModel = require('../models/realmModel.js');

router.get('/', async (req, res, next) => {
    try {
        const realms = await WoWRealmModel.getRealms();

        if(realms.length === 0) {
            const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
            const wowRealmApi = new WoWRealmApi(decodedToken.btoken);
            const result = await wowRealmApi.fetchRealms();
            return res.status(200).json(result);
        }

        return res.status(200).json(realms);
    } catch (err) {
        next(err);
    }
});

module.exports = router;