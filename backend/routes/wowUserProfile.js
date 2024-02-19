const express = require('express');
const router = express.Router();
const attachToken = require('../middleware/attachToken.js');
// const WoWProfile = require('../models/wowProfileModel.js');
const WoWApi = require('../blizzard-api/wowApi.js');

router.get('/', attachToken, async (req, res, next) => {
    try {
        console.log('req.token: ', req)
        const wowapi = new WoWApi(req.token);
        console.log('WOW API: ', wowapi);
        const result = await wowapi.getUserProfile();
        console.log('result IN ROUTES: ', result);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
