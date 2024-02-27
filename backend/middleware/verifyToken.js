const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../db/config.js');
const {ExpressError} = require('../error-handling/ExpressError.js');

const verifyToken = (req, res, next) => {
    try {
        const token = req.header('authorization').split(' ')[1];
        if (!token) next(new ExpressError('Access Denied', 401));
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        next(new ExpressError('Invalid token', 401));
    }

};

module.exports = verifyToken;