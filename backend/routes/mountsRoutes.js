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

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:mountId', async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        const mountId = req.params.mountId;
        const mountDb = await WoWMountsModel.getMountById(mountId);
        const {mount_description, mount_faction, mount_source, image_url} = mountDb;

        if(mount_description || mount_faction || mount_source || image_url) {
            return res.status(200).json(mountDb);
        }
       
        const wowMountsApi = new WoWMountsApi(decodedToken.btoken);
        const result = await wowMountsApi.getMountData(mountId);

        await WoWMountsModel.updateMount(mountId, result);

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;