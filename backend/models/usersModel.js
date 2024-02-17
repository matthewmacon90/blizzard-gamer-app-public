const db = require('../db/db.js');

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


module.exports = {
    registerUser,
    getAllUsers,
    getUserById
};