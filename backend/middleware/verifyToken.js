const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../db/config.js');
const ExpressError = require('../error-handling/ExpressError.js');

const verifyToken = (req, res, next) => {
    try {
        const token = req.header('_token');
        if (!token) return next(new ExpressError('Access denied', 401));
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        return next(new ExpressError('Invalid token', 401));
    }

};

module.exports = verifyToken;