const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.js');
const {decodeToken} = require('../helpers/jwt-token/jwt.js');
const WoWMountsApi = require('../blizzard-api/wowMountsApi.js');
const WoWMountsModel = require('../models/mountsModel.js');

router.get('/', async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        const mountsDb = await WoWMountsModel.getMounts();

        if(mountsDb.length > 0) {
            return res.status(200).json(mountsDb);
        }

        const wowMountsApi = new WoWMountsApi(decodedToken.btoken);
        const result = await wowMountsApi.getMounts();
        console.log('RESULT MOUNTS ROUTE: ', result);

        return res.status(200).json({ message: 'Mounts route works' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:mountId', async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        const mountId = req.params.mountId;

        const wowMountsApi = new WoWMountsApi(decodedToken.btoken);
        const result = await wowMountsApi.getMountData(mountId);
        console.log('RESULT MOUNT DATA ROUTE: ', result);

        await WoWMountsModel.updateMount(mountId, result);

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;