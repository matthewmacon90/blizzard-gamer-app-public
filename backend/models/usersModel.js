const db = require('../db/db.js');

const registerUser = async (newUser) => {
    console.log('newUser:', newUser);
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