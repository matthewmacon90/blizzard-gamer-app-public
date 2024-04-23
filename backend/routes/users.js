const express = require('express');
const router = express.Router();
const User = require('../models/usersModel.js');
const verifyToken = require('../middleware/verifyToken.js');
const { decodeToken } = require('../helpers/jwt-token/jwt');

router.get('/', verifyToken, async (req, res, next) => {
    try {
        const result = await User.getAllUsers();
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.get('/verify', verifyToken, async (req, res, next) => {
    try {
        return res.status(200).json({ message: 'Token verified' });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.get('/refresh', verifyToken, async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        const result = await User.refreshToken(decodedToken.id);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.get('/profile', verifyToken, async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        const { id } = decodedToken;
        const result = await User.getAuthenticatedUserInfo(id);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.get('/:id', verifyToken, async (req, res, next) => {
    try {
        const result = await User.getUserById(id);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.patch('/profile/update', verifyToken, async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        const { id } = decodedToken;
        const { username, email, firstName, lastName, battleTag } = req.body;
        const result = await User.updateUser(id, username, email, firstName, lastName, battleTag);
        console.log(result);

        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', verifyToken, async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.headers.authorization.split(' ')[1]);
        const { id } = decodedToken;
        const result = await User.deleteUser(id);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;
