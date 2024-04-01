const db = require('../db/db.js');
const {ExpressError, NotFoundError} = require('../error-handling/ExpressError.js');

class WoWRealmModel {
    static async getRealms() {
        try {
            const result = await db.query(`
                SELECT * 
                FROM realms
                ORDER BY realm_name`);
            return result.rows;
        } catch (err) {
            throw new NotFoundError('Realms not found', 404);
        }
    }

    static async getRealmById(realm_id) {
        try {
            const result = await db.query(`SELECT * FROM realms WHERE realm_id = $1`, [realm_id]);
            return result.rows[0];
        } catch (err) {
            throw new NotFoundError('Realm not found', 404);
        }
    }

    static async getRealmBySlug(realmSlug) {
        try {
            const result = await db.query(`SELECT * FROM realms WHERE realm_slug = $1`, [realmSlug]);
            return result.rows[0];
        } catch (err) {
            throw new NotFoundError('Realm not found', 404);
        }
    }

    static async insertRealm(realm_id, realm_name, connected_realm_id, realm_slug) {
        try {
            await db.query(`
                INSERT INTO realms (realm_id, realm_name, connected_realm_id, realm_slug)
                VALUES ($1, $2, $3, $4)
                `, [realm_id, realm_name, connected_realm_id, realm_slug]);
        } catch (err) {
            throw new ExpressError('Error inserting realms', 500);
        }
    }

    static async updateRealm(realmID, realmName, connectedRealmID, realmSlug) {
        try {
            const result = await db.query(`
                UPDATE realms 
                SET realm_name = $2, connected_realm_id = $3, realm_slug = $4 
                WHERE realm_id = $1 
                RETURNING *`, [realmID, realmName, connectedRealmID, realmSlug]);
            return result.rows[0];
        } catch (err) {
            throw new ExpressError('Error updating realm', 500);
        }
    }
};

module.exports = WoWRealmModel;