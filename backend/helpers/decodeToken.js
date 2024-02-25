const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
    const decoded = jwt.decode(token);
    return decoded;
};

module.exports = decodeToken;