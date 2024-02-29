const jwt = require('jose');
const { JWT_SECRET } = require('../db/config.js');
const {ExpressError} = require('../error-handling/ExpressError.js');
const {decryptEncryptedToken} = require('../helpers/jwt-token/jwt.js');

const verifyToken = async (req, res, next) => {
    try {
        const encryptedToken = req.header('authorization').split(' ')[1];
        const decryptedToken = await decryptEncryptedToken(encryptedToken);
        const secretKey = Buffer.from(JWT_SECRET, 'base64');

        await jwt.jwtVerify(decryptedToken, secretKey, {
            algorithms: ['HS256'],
            issuer: 'sonsofthunder.io',
            audience: 'sons-app'
          });

        next();
    } catch (error) {
        next(new ExpressError('Invalid token', 401));
    }
};

module.exports = verifyToken;