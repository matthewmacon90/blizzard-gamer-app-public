const jwt = require('jose');
const { JWT_SECRET } = require('../../db/config.js');


const encryptToken = async (payload) => {
    try {
        const { id, username } = payload;
        const token = await new jwt.EncryptJWT({ id, username })
            .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
            .setIssuedAt()
            .setIssuer('sonsofthunder.io')
            .setAudience('sons-app')
            .setExpirationTime('1h')
            .encrypt(Buffer.from(JWT_SECRET, 'base64'));

        return token;
    } catch (err) {
        console.error(err);
    }
};

module.exports = encryptToken;