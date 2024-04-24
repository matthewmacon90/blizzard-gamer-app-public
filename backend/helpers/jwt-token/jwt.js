const jwt = require('jose');
const { JWT_SECRET, ENCRYPT_JWT_SECRET } = require('../../db/config');

const signToken = async (payload) => {
    try {
        const token = await new jwt.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setIssuer('sonsofthunder.io')
            .setAudience('sons-app')
            .setExpirationTime('1h')
            .sign(Buffer.from(JWT_SECRET, 'base64'));
        
        const encryptedToken = await encryptToken(token);

        return encryptedToken;
    } catch (err) {
        console.log(err);
    }
};

const encryptToken = async (signedToken) => {
    try {
        const token = await new jwt.EncryptJWT({signedToken: signedToken})
            .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
            .encrypt(Buffer.from(ENCRYPT_JWT_SECRET, 'base64'));
        return token;
    } catch (err) {
        console.log(err);
    }
};

const decryptEncryptedToken = async (encryptedToken) => {
    try{
        const protectedHeader = jwt.decodeProtectedHeader(encryptedToken);
        const token = await jwt.jwtDecrypt(encryptedToken, Buffer.from(ENCRYPT_JWT_SECRET, 'base64'), {alg: protectedHeader.alg, enc: protectedHeader.enc});

        return token.payload.signedToken;
    } catch (error) {
        console.log(error);
    }
};

const decodeToken = async (token) => {
    const decryptedToken = await decryptEncryptedToken(token);
    const secretKey = Buffer.from(JWT_SECRET, 'base64');

    const verifiedToken = await jwt.jwtVerify(decryptedToken, secretKey, {
        algorithms: ['HS256'],
        issuer: 'sonsofthunder.io',
        audience: 'sons-app'
      });

      console.log(verifiedToken.payload)

      const payload = {
        id: verifiedToken.payload.id,
        username: verifiedToken.payload.username, 
        battleTag: verifiedToken.payload.battleTag,
        btoken: verifiedToken.payload.btoken
    };

    return payload;
};

module.exports = {
    encryptToken,
    signToken,
    decodeToken,
    decryptEncryptedToken
};