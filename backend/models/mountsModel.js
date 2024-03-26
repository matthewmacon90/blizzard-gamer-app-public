const db = require('../db/db.js');
const {ExpressError, NotFoundError} = require('../error-handling/ExpressError.js');

class WoWMountsModel {
    static async getMounts() {
        try {
            const result = await db.query(`
                SELECT *
                FROM mounts`);
            return result.rows;
        } catch (err) {
            throw new NotFoundError('Not Found', 404);
        }
    }

    static async getMountById(mount_id) {
        try {
            const result = await db.query(`
                SELECT * FROM mounts
                WHERE mount_id = $1
            `,[mount_id]);
            return result.rows[0];
        } catch (err) {
            throw new NotFoundError
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
            console.log(err);
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
            console.log(err);
            throw new NotFoundError
        }
    }
};

module.exports = WoWMountsModel;