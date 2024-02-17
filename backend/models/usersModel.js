const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            SELECT username FROM users
            WHERE username = $1
            RETURNING username
        `, [username]);
    } catch (err) {
        return new ExpressError('Authentication failed.', 401)
    }
};

//Read more on JWT and how to implement it here. 
//https://dvmhn07.medium.com/jwt-authentication-in-node-js-a-practical-guide-c8ab1b432a49
const authenticateUserJWT = async (username, password) => {
    try {
        const userFound = await getUserByUsername(username);
        if(!userFound) return new ExpressError('Authentication failed.', 401);

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) return new ExpressError('Authentication failed.', 401);

        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {expiresIn: '1h',});

        return res.status(200).json({ token });
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