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
            throw new ExpressError('Error inserting mounts', 500);
        }
    }

    static async updateMount(mount_id, mount) {
        try {
            const {mount_description, mount_faction, mount_source, image_url} = mount;
            await db.query(`
                UPDATE mounts
                SET mount_description = $1, mount_faction = $2, mount_source = $3, image_url = $4
                WHERE mount_id = $5`
            , [mount_description, mount_faction, mount_source, image_url, mount_id]);

        } catch (err) {
            console.error(err);
            throw new ExpressError('Error updating mounts', 500);
        }
    }
};

module.exports = MountsModel;