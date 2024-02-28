const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const {ExpressError} = require('../error-handling/ExpressError.js');
const generatePassword = require('generate-password');
const {generateUsername} = require('unique-username-generator');
const encryptToken = require('../authentication/jwt-token/jwt.js');

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

    static async getAuthenticatedUserInfo (id) {
        try {
            const result = await db.query('SELECT username, email, first_name AS firstName, last_name AS lastName FROM users WHERE user_id = $1', [id]);
            return result.rows[0];
        } catch (err) {
            console.error(err);
            throw new ExpressError('Internal Server Error', 500);
        }
    }

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

    static async getUserByBattleTag (battletag) {
        try {
            const result = await db.query('SELECT username, first_name AS firstName, last_name AS lastName FROM users WHERE battletag = $1', [battletag]);
            return result.rows[0];
        } catch (err) {
            console.error(err);
        }
    }

    static async getUserByUsername (username) {
        try {
            const result = await db.query('SELECT user_id, username, password FROM users WHERE username = $1', [username]);
            return result.rows[0];
        } catch (err) {
            throw new ExpressError('Authentication failed.', 401)
        }
   }

   static getUserByEmail (email) {
    try {
        const result = db.query('SELECT email FROM users WHERE email = $1', [email]);
        return result.rows[0]
    } catch (err) {
        console.error(err);
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

    static async updateUser (id, username, email, firstName, lastName) {
        try {
            const result = await db.query(`
                UPDATE users 
                SET username = $1, email = $2, first_name = $3, last_name = $4 
                WHERE user_id = $5 
                RETURNING username, email, first_name AS firstName, last_name AS lastName`, 
                [username, email, firstName, lastName, id]);
            return result.rows[0];
        } catch (err) {
            if(err.code === '23505') throw new ExpressError('Username or email already exists', 409);
        }
    }

    static async authenticateUserJWT (username, password) {
        try {
            const userFound = await User.getUserByUsername(username);
            const passwordMatch = await bcrypt.compare(password, userFound.password);

            if(!userFound.username || !passwordMatch) throw new ExpressError('Authentication failed.', 401);

            const payload = {
                id: userFound.user_id,
                username: userFound.username
            };

            console.log('PAYLOAD', payload);

            const token = await encryptToken(payload);
            console.log('TOKEN', token);

            await User.updateLoginTime(username);

            // const token = jwt.sign({id:userFound.user_id, username: userFound.username}, JWT_SECRET, {expiresIn: '1h',});

            return token;
        } catch (err) {
            throw new ExpressError('Login Failed.', 500);
        }
    }

    //This method also needs to be finished out.
    static async battleNetFindCreate (profile) {
        try {
            const {id, battletag, token} = profile;
            const result = await this.getUserByBattleTag(battletag);
        } catch (err) {
            throw new ExpressError('Internal Server Error', 500);
        }
    }

    //Finish out this method
    static async linkBattleNetAccount (email) {
        try {
            
        } catch (err) {
            throw new ExpressError('Internal Server Error', 500);
        }
    }
}

module.exports = User;