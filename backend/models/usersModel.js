const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const {ExpressError} = require('../error-handling/ExpressError.js');
const {signToken} = require('../helpers/jwt-token/jwt.js');

class User {
    static async registerUser (username, hashedPassword, email, firstName, lastName, battletag) {
        try {
            const result = await db.query(
                `INSERT INTO users (username, password, email, first_name, last_name, battle_tag) 
                 VALUES ($1, $2, $3, $4, $5, $6) 
                 RETURNING username, email, first_name AS firstName, last_name AS lastName, battle_tag AS battletag`, 
                 [username, hashedPassword, email, firstName, lastName, battletag]);
            return result.rows[0]
        } catch (err) {
            console.log(err);
            throw err.code === '23505' ? new ExpressError('Username or email already exists', 409) : new ExpressError('Internal Server Error', 500);
        }
    };

    static async getAuthenticatedUserInfo (id) {
        try {
            const result = await db.query(`
                SELECT username, email, first_name AS firstName, last_name AS lastName, battle_tag AS battletag, battlenet_token AS btoken, btoken_expires AS btokenexpires
                FROM users 
                WHERE user_id = $1`, [id]);
            return result.rows[0];
        } catch (err) {
            console.log('ERROR GETTING AUTHENTICATED USER', err);
            throw new ExpressError('Internal Server Error', 500);
        }
    }

    static async getAllUsers () {
        try {
            const result = await db.query('SELECT username, first_name AS firstName, last_name AS lastName FROM users');
            return result.rows;
        } catch (err) {
            console.log(err);
        }
    }

    static async getUserById (id) {
        try {
            const result = await db.query(`SELECT user_id, username, battle_tag AS battletag, battlenet_token AS btoken
            FROM users 
            WHERE user_id = $1`, [id]);
            return result.rows[0] ? result.rows[0] : new Error('No user found with that id');
        } catch (err) {
            console.log(err);
        }
    }

    static async getUserByBattleTag (battletag) {
        try {
            const result = await db.query('SELECT battle_tag AS battletag FROM users WHERE battle_tag = $1', [battletag]);
            return result.rows[0];
        } catch (err) {
            console.log(err);
        }
    }

    static async getUserByUsername (username) {
        try {
            const result = await db.query(`
                SELECT user_id, username, password, battlenet_token AS btoken, battle_tag AS battletag 
                FROM users WHERE username = $1`, 
                [username]);
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
        console.log(err);
    }
    }

    static async updateLoginTime (username) {
        try {
            const result = await db.query(`UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE username = $1 RETURNING last_login`, [username]);
            return result.rows[0];
        } catch (err) {
            console.log(err);
        }
    }

    static async updateUser (id, username, email, firstName, lastName, battletag) {
        try {
            const result = await db.query(`
                UPDATE users 
                SET username = $1, email = $2, first_name = $3, last_name = $4, battle_tag = $5
                WHERE user_id = $6 
                RETURNING username, email, first_name AS firstName, last_name AS lastName, battle_tag AS battleTag, battlenet_token AS btoken, btoken_expires AS btokenexpires`, 
                [username, email, firstName, lastName, battletag, id]);
            return result.rows[0];
        } catch (err) {
            if(err.code === '23505') throw new ExpressError('Username or email already exists', 409);
        }
    }

    static async deleteUser (id) {
        try {
            await db.query(
                `DELETE FROM users
                 WHERE user_id = $1`, 
                [id]);
        } catch (err) {
            console.log(err);
            throw new ExpressError('Internal Server Error', 500);
        }
    };

    static async linkBattleTag (battlenetID, battletag, accessToken) {
        try {
            const result = await db.query(`
                UPDATE users
                SET battlenet_id = $1, battlenet_token = $2, btoken_expires = CURRENT_TIMESTAMP + INTERVAL '24 hours'
                WHERE battle_tag = $3
                RETURNING user_id, username, battlenet_token, battle_tag AS battletag, btoken_expires AS expires
                `, [battlenetID, accessToken, battletag]);
            return result.rows[0];
        } catch (err) {
            console.log(err);
        }
    }

    static async refreshToken (id) {
        try {
            const result = await User.getUserById(id);
            const payload = {
                id: result.user_id,
                username: result.username,
                battletag: result.battletag,
                btoken: result.btoken
            };
            const token = await signToken(payload);
            return token;
        } catch (err) {
            console.log(err);
        }
    };

    static async authenticateUserJWT (username, password) {
        try {
            const userFound = await User.getUserByUsername(username);
            const passwordMatch = await bcrypt.compare(password, userFound.password);

            if(!userFound.username || !passwordMatch) throw new ExpressError('Authentication failed.', 401);

            const payload = {
                id: userFound.user_id,
                username: userFound.username,
                battletag: userFound.battletag,
                btoken: userFound.btoken
            };

            const token = await signToken(payload);
            await User.updateLoginTime(username);

            return token;
        } catch (err) {
            throw new ExpressError('Login Failed.', 500);
        }
    }
}

module.exports = User;