const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {registerUser} = require('../../models/usersModel.js');
const ExpressError = require('../../error-handling/ExpressError.js');


router.post('/', async (req, res, next) => {
    try {
        const {username, password, email, firstName, lastName} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await registerUser(username, hashedPassword, email, firstName, lastName);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        err.code === '23505' ? new ExpressError('Username or email already exists', 409) : new ExpressError('Internal Server Error', 500);
        next(err);
    }
});

module.exports = router;
