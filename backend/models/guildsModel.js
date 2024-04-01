//PART 2: GUILD ROUTES NOT IN USE AT THE MOMENT
const db = require('../db/db.js');
const {ExpressError, NotFoundError} = require('../error-handling/ExpressError.js');

class WoWGuildsModel {
    static async getGuilds() {
        try {
            const result = await db.query(`SELECT * FROM guilds`);
            return result.rows;
        } catch (err) {
            throw new ExpressError('Error getting guilds', 500);
        }
    }

    static async getGuildsByRealmId(realmId) {
        try {
            const result = await db.query(`
                SELECT * 
                FROM guilds
                WHERE guild_realm_id = $1`, [realmId]);
            return result.rows;
        } catch (err) {
            throw new NotFoundError
        }
    }

    static async insertGuild(guildId, guildName, realmId, realmSlug, faction) { 
        try {
            await db.query(`
                INSERT INTO guilds (guild_id, guild_name, guild_realm_id, guild_realm_slug, guild_faction)
                VALUES ($1, $2, $3, $4, $5)
            `, [guildId, guildName, realmId, realmSlug, faction]);
        } catch (error) {
            console.log('ERROR CREATING GUILD: ', error);
            if (error.code === '23505') {
                return new ExpressError('Guild already exists', 400);
            }
            throw error;
        }
    }
};

module.exports = WoWGuildsModel;