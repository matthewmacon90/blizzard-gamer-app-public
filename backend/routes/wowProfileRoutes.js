const express = require('express');
const router = express.Router();
const WoWApi = require('../blizzard-api/wowApi.js');
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


module.exports = router;
