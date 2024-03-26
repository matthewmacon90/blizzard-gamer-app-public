const db = require('../db/db.js');
const {ExpressError, NotFoundError} = require('../error-handling/ExpressError.js');

class WoWDungeonModel {
    static async getDungeons() {
        try {
            const result = await db.query(`SELECT * FROM dungeons`);
            return result.rows;
        } catch (err) {
            throw new ExpressError('Error getting dungeons', 500);
        }
    }

    static async getDungeonById(dungeon_id) {
        try {
            const result = await db.query(`SELECT * FROM dungeons WHERE dungeon_id = $1`, [dungeon_id]);
            return result.rows[0];
        } catch (err) {
            throw new NotFoundError('Dungeon Not Found', 404);
        }
    }

    static async insertDungeon(dungeon_id, dungeon_name, current_period) {
        try {
            await db.query(`
                INSERT INTO dungeons (dungeon_id, dungeon_name, current_period)
                VALUES ($1, $2, $3)
                `, [dungeon_id, dungeon_name, current_period]);
        } catch (err) {
            throw new ExpressError('Error inserting dungeons', 500);
        }
    }

    static async updateDungeon(current_period, dungeon_id) {
        try {
            const result = await db.query(`
                UPDATE dungeons 
                SET current_period = $1
                WHERE dungeon_id = $2 
                RETURNING *`, [current_period, dungeon_id]);
            return result.rows[0];
        } catch (err) {
            throw new NotFoundError('Dungeon Not Found', 404);
        }
    }
};

module.exports = WoWDungeonModel;