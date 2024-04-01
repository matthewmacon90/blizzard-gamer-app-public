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
                SELECT * 
                FROM keystone_leaderboard kl
                INNER JOIN dungeons d ON kl.dungeon_id = d.dungeon_id
                WHERE connected_realm_id = $1
                ORDER BY d.dungeon_id
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

    static async insertLeaderboard(dungeonId, periodId, leadingGroups, affixes, leaderboardId, connectedRealmId) {
        try {
            await db.query(`
                INSERT INTO keystone_leaderboard 
                (leaderboard_id, dungeon_id, current_period_leaderboard, leading_groups, affixes, connected_realm_id)
                VALUES ($1, $2, $3, $4, $5, $6)
                `, [leaderboardId, dungeonId, periodId, leadingGroups, affixes, connectedRealmId]);
            return 'Inserted Leaderboard';
        } catch (err) {
            console.log('LEADERBOARD INSERT ERROR: ', err);
            throw new ExpressError('Error inserting leaderboard', 500);
        }
    }

    static async updateLeaderboard(leadingGroups, affixes, dungeonId, periodId, leaderboardId) {
        try {
            await db.query(`
                UPDATE keystone_leaderboard 
                SET leading_groups = $1, affixes = $2, dungeon_id = $3, current_period_leaderboard = $4
                WHERE leaderboard_id = $5
                `, [leadingGroups, affixes, dungeonId, periodId, leaderboardId]);
            return 'Updated Leaderboard';
        } catch (err) {
            console.log('LEADERBOARD updateLeaderboard ERROR: ', err);
            throw new NotFoundError('Leaderboard Not Found', 404);
        }
    }
};

module.exports = WoWLeaderboardModel;