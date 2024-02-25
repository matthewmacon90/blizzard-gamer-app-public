const express = require('express');
const router = express.Router();
const User = require('../models/usersModel.js');
const bcrypt = require('bcrypt'); //I will add this to update user later.
const verifyToken = require('../middleware/verifyToken.js');
const decodeToken = require('../helpers/decodeToken.js');

router.get('/', verifyToken, async (req, res, next) => { 
    try {
        const result = await User.getAllUsers();
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/profile', verifyToken, async (req, res, next) => {
    try {
        const decodedToken = decodeToken(req.headers.authorization.split(' ')[1]);
        const {id} = decodedToken;
        const result = await User.getAuthenticatedUserInfo(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:id', verifyToken, async (req, res, next) => {
    try {
        const result = await User.getUserById(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/link/battlenet', verifyToken, async (req, res, next) => {
    try {
        const {email} = req.body;
        const result = await User.linkBattleNetAccount(email);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.patch('/profile/update', verifyToken, async (req, res, next) => {
    try {
        const decodedToken = decodeToken(req.headers.authorization.split(' ')[1]);
        const {id} = decodedToken;
        const {username, email, firstname, lastname} = req.body;
        const result = await User.updateUser(id, username, email, firstname, lastname);

        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', verifyToken, async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await User.deleteUser(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;