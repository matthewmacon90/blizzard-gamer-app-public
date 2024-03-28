const db = require('../db/db.js');
const {ExpressError, NotFoundError} = require('../error-handling/ExpressError.js');

class WoWLeaderboardModel {
    static async getLeaderboards() {
        try {
            const result = await db.query(`SELECT * FROM keystone_leaderboard`);
            return result.rows;
        } catch (err) {
            throw new ExpressError('Error getting dungeons', 500);
        }
    }

    static async getLeaderboardById(character_id, dungeon_id, period_id) {
        try {
            const result = await db.query(`
                SELECT *
                FROM keystone_leaderboard
                WHERE character_id = $1 AND dungeon_id = $2 AND current_period = $3
                `, [character_id, dungeon_id, period_id]);
            return result.rows[0];
        } catch (err) {
            throw new NotFoundError('Leaderboard Not Found', 404);
        }
    }

    static async insertLeaderboard(dungeon_id, dungeon_name, current_period, group_ranking, keystone_level, mythic_rating, mythic_rating_color, character_id, character_name, realm_id) {
        try {
            await db.query(`
                INSERT INTO keystone_leaderboard 
                (dungeon_id, dungeon_name, current_period, group_ranking, keystone_level, mythic_rating, mythic_rating_color, character_id, character_name, realm_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                `, [
                    dungeon_id, 
                    dungeon_name, 
                    current_period, 
                    group_ranking, 
                    keystone_level, 
                    mythic_rating, 
                    mythic_rating_color, 
                    character_id, 
                    character_name,
                    realm_id
                ]);
            return 'Inserted Leaderboard';
        } catch (err) {
            throw new ExpressError('Error inserting leaderboard', 500);
        }
    }

    static async updateLeaderboard(group_ranking, keystone_level, mythic_rating, mythic_rating_color, character_id, dungeon_id, period_id) {
        try {
            await db.query(`
                UPDATE keystone_leaderboard 
                SET group_ranking = $1, keystone_level = $2, mythic_rating = $3, mythic_rating_color = $4
                WHERE character_id = $5 AND dungeon_id = $6 AND current_period = $7
                `, [group_ranking, keystone_level, mythic_rating, mythic_rating_color, character_id, dungeon_id, period_id]);
            return 'Updated Leaderboard';
        } catch (err) {
            throw new NotFoundError('Leaderboard Not Found', 404);
        }
    }
};

module.exports = WoWLeaderboardModel;