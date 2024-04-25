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

    static async getGuildById(id) {
        try {
            const result = await db.query(`
                SELECT * 
                FROM guilds
                WHERE guild_id = $1`, [id]);
            return result.rows[0];
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

    static async insertGuild(guildId, guildName, guildDescription=null, realmId=null, realmSlug=null, faction=null) { 
        try {
            await db.query(`
                INSERT INTO guilds (guild_id, guild_name, guild_description, guild_realm_id, guild_realm_slug, guild_faction)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, [guildId, guildName, guildDescription, realmId, realmSlug, faction]);
        } catch (error) {
            console.log('ERROR CREATING GUILD: ', error);
            if (error.code === '23505') {
                return new ExpressError('Guild already exists', 400);
            }
            throw error;
        }
    }

    static async updateGuild(guildId, guildName=null, guildDescription=null, realmId=null, realmSlug=null, faction=null) {
        try {
            await db.query(`
                UPDATE guilds
                SET guild_name = $2, guild_description = $3, guild_realm_id = $4, guild_realm_slug = $5, guild_faction = $6
                WHERE guild_id = $1
            `, [guildId, guildName, guildDescription, realmId, realmSlug, faction]);
        } catch (error) {
            throw new ExpressError('Error updating guild', 500);
        }
    }
};

module.exports = WoWGuildsModel;