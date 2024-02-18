const express = require('express');
const router = express.Router();
const User = require('../models/usersModel.js');
const bcrypt = require('bcrypt');
const verifyToken = require('../middleware/verifyToken.js');

router.get('/', verifyToken, async (req, res, next) => { 
    try {
        const result = await User.getAllUsers();
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:id', verifyToken, async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await User.getUserById(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.patch('/:id', verifyToken, async (req, res, next) => {
    try {
        const {id} = req.params;
        const {password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.updateUserPassword(id, hashedPassword);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
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
