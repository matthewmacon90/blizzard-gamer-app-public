const db = require('../db/db.js');
const {ExpressError} = require('../error-handling/ExpressError.js');

// This is a model for the WoWProfileData. It will be used to create a new user profile in the database or connect to an existing one.

class WoWProfileData {
    static async checkDb(user_id) {
        try {
            const result = await db.query('SELECT * FROM characters WHERE user_id = $1', [user_id]);
            return result.rows;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async createCharacters(data) {
        try {
            let i = 0;
            const {user_id, characters} = data;
            let result = null;

            while(i < characters.length) {
                const {character_id, name, level, character_class, realm_id, realm_name, realm_slug} = characters[i];
                result = db.query(`
                    INSERT INTO characters (character_id, character_name, character_level, character_class, realm_id, realm_name, realm_slug, user_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    RETURNING character_id, character_name, character_level, character_class, realm_id, realm_name, realm_slug, user_id
                `, [character_id, name, level, character_class, realm_id, realm_name, realm_slug, user_id]);
                i++;
            }
            await result;
            return result.rows;
        } catch (error) {
            console.log('ERROR CREATING CHARACTERS: ', error);
            if (error.code === '23505') {
                return new ExpressError('Character already exists', 400);
            }
            throw error;
        }
    }

    static async updateCharactersMass(data) {
        try {
            let i = 0;
            const {user_id, date, characters} = data;
            let result = null;

            while(i < characters.length) {
                const {character_id, name, level, character_class, realm_id, realm_name, realm_slug} = characters[i];
                result = db.query(`
                    UPDATE characters 
                    SET character_id = $1, character_name = $2, character_level = $3, character_class = $4, 
                        realm_id = $5, realm_name = $6, realm_slug = $7, user_id = $8, created_at = $9
                    RETURNING character_id, character_name, character_level, character_class, realm_id, realm_name, realm_slug, user_id
                `, [character_id, name, level, character_class, realm_id, realm_name, realm_slug, user_id, date]);
                i++;
            }
            await result;
            return result.rows;
        } catch (error) {
            console.log('UPDATING ERROR', error);
            throw error;
        }
    };
};

module.exports = WoWProfileData;