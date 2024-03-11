const db = require('../db/db.js');
const {ExpressError} = require('../error-handling/ExpressError.js');

class MountsModel {
    static async getMounts() {
        try {
            const result = await db.query(`
                SELECT mount_id, mount_name
                FROM mounts`);
            return result.rows;
        } catch (err) {
            throw new ExpressError('Error fetching mounts', 500);
        }
    }

    static async insertMounts(mounts) {
        try {
            mounts.forEach(async (mount) => {
                await db.query(`
                    INSERT INTO mounts (mount_id, mount_name) 
                    VALUES ($1, $2)`, 
                [mount.mount_id, mount.mount_name]);
            });
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = MountsModel;