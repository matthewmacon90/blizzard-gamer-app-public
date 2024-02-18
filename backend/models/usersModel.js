const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../db/config.js');
const ExpressError = require('../error-handling/ExpressError.js');
const generatePassword = require('generate-password');
const {generateUsername} = require('unique-username-generator');

class User {
    static async registerUser (username, hashedPassword, email, firstName, lastName) {
        try {
            const result = await db.query(
                `INSERT INTO users (username, password, email, first_name, last_name) 
                 VALUES ($1, $2, $3, $4, $5) 
                 RETURNING username, email, first_name AS firstName, last_name AS lastName`, 
                 [username, hashedPassword, email, firstName, lastName]);
            return result.rows[0]
        } catch (err) {
            console.error(err);
            throw err.code === '23505' ? new ExpressError('Username or email already exists', 409) : new ExpressError('Internal Server Error', 500);
        }
    };

    static async getAllUsers () {
        try {
            const result = await db.query('SELECT username, first_name AS firstName, last_name AS lastName FROM users');
            return result.rows;
        } catch (err) {
            console.error(err);
        }
    }

    static async getUserById (id) {
        try {
            const result = await db.query('SELECT username, first_name AS firstName, last_name AS lastName FROM users WHERE user_id = $1', [id]);
            return result.rows[0] ? result.rows[0] : new Error('No user found with that id');
        } catch (err) {
            console.error(err);
        }
    }

    static async getUserByUsername (username) {
        try {
            const result = await db.query('SELECT username, password FROM users WHERE username = $1', [username]);
            return result.rows[0];
        } catch (err) {
            throw new ExpressError('Authentication failed.', 401)
        }
   }

    static async updateLoginTime (username) {
        try {
            const result = await db.query(`UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE username = $1 RETURNING last_login`, [username]);
            return result.rows[0];
        } catch (err) {
            console.error(err);
        }
    }

    static async authenticateUserJWT (username, password) {
        try {
            const userFound = await User.getUserByUsername(username);
            const passwordMatch = await bcrypt.compare(password, userFound.password);

            if(!userFound.username || !passwordMatch) throw new ExpressError('Authentication failed.', 401);

            await User.updateLoginTime(username);

            const token = jwt.sign({ user: userFound.username}, SECRET_KEY, {expiresIn: '1h',});

            return token;
        } catch (err) {
            throw new ExpressError('Login Failed.', 500);
        }
    }

    static findUserByEmail (email) {
        try {
            const result = db.query('SELECT email FROM users WHERE email = $1', [email]);
            return result.rows[0]
        } catch (err) {
            console.error(err);
        }
    }

    static async findOrCreate (profile) {
        try {
            const{_json: { email, given_name, family_name }} = profile;
            const result = await this.findUserByEmail(email);

            if(!result) {
                const defaultPassword = generatePassword.generate({
                    length: 25,
                    numbers: true,
                    symbols: true,
                    uppercase: true,
                    lowercase: true,
                    strict: true
                });

                const hashedPassword = await bcrypt.hash(defaultPassword, 12);
                let username;
                do {
                    username = generateUsername('', 3, 30);
                } while (await this.getUserByUsername(username));

                await this.registerUser(username, hashedPassword, email, given_name, family_name);
            }
        } catch (err) {
            err.code === '23505' ? new ExpressError('Username or email already exists', 409) : new ExpressError('Internal Server Error', 500);
            throw err;
        }
    }
}

module.exports = User;