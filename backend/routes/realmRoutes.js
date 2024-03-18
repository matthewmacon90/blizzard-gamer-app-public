const express = require('express');
const router = express.Router();
const WoWRealmModel = require('../models/realmModel.js');

router.get('/', async (req, res, next) => {
    try {
        const result = await WoWRealmModel.getRealms();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;