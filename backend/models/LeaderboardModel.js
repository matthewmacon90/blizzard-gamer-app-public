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

    static async getLeaderboardById(leaderboard_id) {
        try {
            const result = await db.query(`
                SELECT *
                FROM keystone_leaderboard
                WHERE leaderboard_id = $1
                `, [leaderboard_id]);
            return result.rows[0];
        } catch (err) {
            console.log('LEADERBOARD getLeaderboardById ERROR: ', err);
            throw new NotFoundError('Leaderboard Not Found', 404);
        }
    }

    static async getLeaderboardByConnectedRealmId(connectedRealmId) {
        try {
            const result = await db.query(`
                SELECT 
                    kl.leaderboard_id AS "leaderboardId",
                    kl.dungeon_id AS "dungeonId",
                    kl.group_ranking AS "groupRanking",
                    kl.keystone_level AS "keystoneLevel",
                    kl.mythic_rating AS "mythicRating",
                    kl.mythic_rating_color AS "mythicRatingColor",
                    c.character_name AS "characterName",
                    r.realm_name AS "realmName",
                    r.realm_slug AS "realmSlug"
                FROM keystone_leaderboard kl
                INNER JOIN dungeons d ON kl.dungeon_id = d.dungeon_id
                INNER JOIN characters c ON kl.character_id = c.character_id
                INNER JOIN realms r ON kl.realm_id = r.realm_id
                WHERE kl.connected_realm_id = $1
                `, [connectedRealmId]);
            return result.rows;
        } catch (err) {
            console.log('LEADERBOARD getLeaderboardByConnectedRealmId ERROR: ', err);
            throw new NotFoundError('Leaderboard Not Found', 404);
        }
    }

    static async getCurrentLeaderboardDungeons(connectedRealmId) {
        try {
            const result = await db.query(`
                SELECT DISTINCT
                    d.dungeon_id AS "dungeonId",
                    d.dungeon_name AS "dungeonName",
                    kl.current_period_leaderboard AS "periodId"
                FROM keystone_leaderboard kl
                INNER JOIN dungeons d ON kl.dungeon_id = d.dungeon_id
                WHERE kl.connected_realm_id = $1
                ORDER BY d.dungeon_id
                `, [connectedRealmId]);
            return result.rows;
        } catch (err) {
            console.log('LEADERBOARD getLeaderboardByConnectedRealmId ERROR: ', err);
            throw new NotFoundError('Leaderboard Not Found', 404);
        }
    }

    static async insertLeaderboard(dungeon_id, current_period, group_ranking, keystone_level, mythic_rating, mythic_rating_color, character_id, realm_id, leaderboard_id, connectedRealmId) {
        try {
            await db.query(`
                INSERT INTO keystone_leaderboard 
                (dungeon_id, current_period_leaderboard, group_ranking, keystone_level, mythic_rating, mythic_rating_color, character_id, realm_id, leaderboard_id, connected_realm_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                `, [
                    dungeon_id,
                    current_period,
                    group_ranking,
                    keystone_level,
                    mythic_rating,
                    mythic_rating_color,
                    character_id,
                    realm_id,
                    leaderboard_id,
                    connectedRealmId
                ]);
            return 'Inserted Leaderboard';
        } catch (err) {
            console.log('LEADERBOARD INSERT ERROR: ', err);
            throw new ExpressError('Error inserting leaderboard', 500);
        }
    }

    static async updateLeaderboard(group_ranking, keystone_level, mythic_rating, mythic_rating_color, leaderboard_id) {
        try {
            await db.query(`
                UPDATE keystone_leaderboard 
                SET group_ranking = $1, keystone_level = $2, mythic_rating = $3, mythic_rating_color = $4
                WHERE leaderboard_id = $5
                `, [group_ranking, keystone_level, mythic_rating, mythic_rating_color, leaderboard_id]);
            return 'Updated Leaderboard';
        } catch (err) {
            console.log('LEADERBOARD updateLeaderboard ERROR: ', err);
            throw new NotFoundError('Leaderboard Not Found', 404);
        }
    }
};

module.exports = WoWLeaderboardModel;