const db = require('../db/db.js');
const {ExpressError} = require('../error-handling/ExpressError.js');

class WoWDungeonModel {
    static async insertRealms(realm_id, realm_name, connected_id, realm_slug) {
        try {
            await db.query(`
                INSERT INTO realms (realm_id, realm_name, connected_id, realm_slug)
                VALUES ($1, $2, $3, $4)
            `, [realm_id, realm_name, connected_id, realm_slug]);
        } catch (err) {
            throw new ExpressError('Error inserting realms', 500);
        }
    }
};

module.exports = WoWDungeonModel;