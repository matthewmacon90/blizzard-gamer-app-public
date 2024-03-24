const db = require('../db/db.js');
const {ExpressError} = require('../error-handling/ExpressError.js');

class WoWRealmModel {
    static async getRealms() {
        try {
            const result = await db.query(`
                SELECT * 
                FROM realms
                ORDER BY realm_name`);
            return result.rows;
        } catch (err) {
            throw new ExpressError('Error getting dungeons', 500);
        }
    }

    static async getRealmById(realm_id) {
        try {
            const result = await db.query(`SELECT * FROM realms WHERE realm_id = $1`, [realm_id]);
            return result.rows[0];
        } catch (err) {
            throw new ExpressError('Error getting realm by id', 500);
        }
    }

    static async insertRealms(realm_id, realm_name, connected_realm_id, realm_slug) {
        try {
            await db.query(`
                INSERT INTO realms (realm_id, realm_name, connected_realm_id, realm_slug)
                VALUES ($1, $2, $3, $4)
                `, [realm_id, realm_name, connected_realm_id, realm_slug]);
        } catch (err) {
            throw new ExpressError('Error inserting realms', 500);
        }
    }

    static async updateRealm() {
        try {
            const result = await db.query(`
                UPDATE realms 
                SET realm_name = $1, connected_id = $2, realm_slug = $3 
                WHERE realm_id = $4 
                RETURNING *`, [realm_name, connected_id, realm_slug, realm_id]);
            return result.rows[0];
        } catch (err) {
            throw new ExpressError('Error updating realm', 500);
        }
    }
};

module.exports = WoWRealmModel;