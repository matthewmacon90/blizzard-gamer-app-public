const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById} = require('../models/usersModel.js');
const bcrypt = require('bcrypt');

router.get('/', async (req, res, next) => { 
    try {
        const result = await getAllUsers();
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await getUserById(id);
        console.log(result);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await updateUserPassword(id, hashedPassword);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await deleteUser(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
