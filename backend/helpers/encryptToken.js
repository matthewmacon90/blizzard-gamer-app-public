//Use this to encrypt the token before storing it to the database.
const jose = require('jose');

const encryptToken = async (token) => {
    console.log('TOKEN', token);
    const secret = jose.base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')
    
    const jwt = await new jose.EncryptJWT({ 'urn:example:claim': true })
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('1h')
    .encrypt(secret)

    console.log(jwt)

};

module.exports = encryptToken;