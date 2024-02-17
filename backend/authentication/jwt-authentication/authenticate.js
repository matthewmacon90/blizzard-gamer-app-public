const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticate = async (password) => {
    const passwordMatch = await bcrypt.compare(password, user.password);
}

module.exports = authenticate;