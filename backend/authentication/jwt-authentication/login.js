const express = require('express');
const router = express.Router();
const {authenticateUserJWT} = require('../../models/usersModel.js');

router.post('/', async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const result = await authenticateUserJWT(username, password);
        console.log('result: ', result);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;