const express = require('express');
const router = express.Router();
const WoWApi = require('../blizzard-api/wowApi.js');
const WoWRealmModel = require('../models/realmModel.js');
const WoWRealmApi = require('../blizzard-api/wowRealmApi.js');
const verifyToken = require('../middleware/verifyToken.js');
const {decodeToken} = require('../helpers/jwt-token/jwt.js');

router.get('/', verifyToken, async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        const wowapi = new WoWApi(decodedToken.btoken, decodedToken.id);
        const result = await wowapi.getUserProfile();
        return res.status(200).json(result);
    } catch (error) {
        console.log('WOW PROFILE ROUTES ERROR', error);
        next(error);
    }
});

router.get('/char', verifyToken, async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        const realms = await WoWRealmModel.getRealms();

        if(realms.length === 0) {
            const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
            const wowRealmApi = new WoWRealmApi(decodedToken.btoken);
            await wowRealmApi.fetchRealms();
        }

        const wowapi = new WoWApi(decodedToken.btoken, decodedToken.id);
        const result = await wowapi.getCharProfile(req.query.characterId);
        return res.status(200).json(result);
    } catch (error) {
        console.log('WOW PROFILE ROUTES ERROR', error);
        next(error);
    }
});


module.exports = router;
