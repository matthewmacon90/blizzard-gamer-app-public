const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../db/config.js');
const ExpressError = require('../error-handling/ExpressError.js');

const registerUser = async (username, hashedPassword, email, firstName, lastName) => {
    try {
        console.log(username, hashedPassword, email, firstName, lastName);
        const result = await db.query(
            `INSERT INTO users (username, password, email, first_name, last_name) 
             VALUES ($1, $2, $3, $4, $5) RETURNING username, email, first_name AS firstName, last_name AS lastName`, 
             [username, hashedPassword, email, firstName, lastName]);
             console.log(result.rows[0]);
        return result.rows[0]
    } catch (err) {
        console.error(err);
        return err.code === '23505' ? new ExpressError('Username or email already exists', 409) : new ExpressError('Internal Server Error', 500);
    }
};

const getAllUsers = async () => {
    try {
        const result = await db.query('SELECT * FROM users');
        return result.rows;
    } catch (err) {
        console.error(err);
    }
};

const getUserById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);

        return result.rows[0] ? result.rows[0] : new Error('No user found with that id');
    } catch (err) {
        console.error(err);
    }
};

const getUserByUsername = async (username) => {
    try {
        const result = await db.query(`
            SELECT username, password FROM users
            WHERE username = $1
        `, [username]);
        return result.rows[0];
    } catch (err) {
        return new ExpressError('Authentication failed.', 401)
    }
};

const updateLoginTime = async (username) => {
    try {
        const result = await db.query(`
            UPDATE users
            SET last_login = CURRENT_TIMESTAMP
            WHERE username = $1
            RETURNING last_login
        `, [username]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
};

const authenticateUserJWT = async (username, password) => {
    try {
        const userFound = await getUserByUsername(username);
        const passwordMatch = await bcrypt.compare(password, userFound.password);

        if(!userFound.username || !passwordMatch) return new ExpressError('Authentication failed.', 401);

        await updateLoginTime(username);
        const token = jwt.sign({ user: userFound.username}, SECRET_KEY, {expiresIn: '1h',});

        return token;
    } catch (err) {
        return new ExpressError('Login Failed.', 500);
    }
};


module.exports = {
    registerUser,
    authenticateUserJWT,
    getAllUsers,
    getUserById
};