const db = require('../db/db.js');
const {ExpressError} = require('../error-handling/ExpressError.js');

class WoWProfileData {
    static async getCharactersByUserId(user_id) {
        try {
            const result = await db.query(`
                SELECT 
                    character_id AS "characterId", 
                    character_name AS "characterName", 
                    character_level AS "characterLevel", 
                    character_class AS "characterClass", 
                    character_gender AS "characterGender",
                    character_faction AS "characterFaction",
                    character_race AS "characterRace",
                    realm_id AS "realmId",
                    realm_name AS "realmName",
                    realm_slug AS "realmSlug",
                    mythic_rating AS "mythic+Rating",
                    is_favorite AS "isFavorite",
                    is_main AS "isMain",
                    created_at AS "createdAt",
                    average_item_level AS "averageItemLevel",
                    equipped_item_level AS "equippedItemLevel",
                    achievement_points AS "achievementPoints",
                    active_title AS "activeTitle",
                    active_spec AS "activeSpec",
                    last_login AS "lastLogin" 
                FROM characters 
                WHERE user_id = $1
                ORDER BY character_level DESC
                `, [user_id]);
            return result.rows;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getCharacterById(character_id) {
        try {
            const result = await db.query(`
                SELECT 
                    c.character_id AS "characterId", 
                    c.character_name AS "characterName", 
                    c.character_level AS "characterLevel", 
                    c.character_class AS "characterClass", 
                    c.character_gender AS "characterGender",
                    c.character_faction AS "characterFaction",
                    c.character_race AS "characterRace",
                    c.realm_id AS "realmId",
                    c.realm_name AS "realmName",
                    c.realm_slug AS "realmSlug",
                    c.mythic_rating AS "mythicRating",
                    c.mythic_rating_color AS "mythicRatingColor",
                    c.is_favorite AS "isFavorite",
                    c.is_main AS "isMain",
                    c.created_at AS "createdAt",
                    c.average_item_level AS "averageItemLevel",
                    c.equipped_item_level AS "equippedItemLevel",
                    c.achievement_points AS "achievementPoints",
                    c.active_title AS "activeTitle",
                    c.active_spec AS "activeSpec",
                    c.last_login AS "lastLogin",
                    c.guild_id AS "guildId",
                    c.raid_profile AS "raidProfile",
                    c.current_gold AS "characterMoney"
                FROM characters c
                WHERE c.character_id = $1
                `, [character_id]);
                console.log('getCharacterById', result.rows[0]);
            return result.rows[0];
        } catch (error) {
            console.log('getCharacterById error:', error);
            throw error;
        }
    }

    static async getCharactersByRealmId(realmId) {
        try {
            const result = await db.query(`
                SELECT * 
                FROM characters 
                WHERE realm_id = $1
                `, [realmId]);
            return result.rows;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async insertCharacter(character_id, name, level, character_class, faction, gender, realm_id, realm_name, realm_slug, user_id) {
        try {
            await db.query(`
                INSERT INTO characters (character_id, character_name, character_level, character_class, character_faction, character_gender, realm_id, realm_name, realm_slug, user_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `, [character_id, name, level, character_class, faction, gender, realm_id, realm_name, realm_slug, user_id]);
        } catch (error) {
            console.log('ERROR CREATING CHARACTERS: ', error);
            if (error.code === '23505') {
                return new ExpressError('Character already exists', 400);
            }
            throw error;
        }
    }

    static async createCharacterLeaderboard(memberId, memberName, memberRealmId, memberRealmSlug, memberFaction) {
        try {
            await db.query(`
                INSERT INTO characters (character_id, character_name, realm_id, realm_slug, character_faction)
                VALUES ($1, $2, $3, $4, $5)
            `, [memberId, memberName, memberRealmId, memberRealmSlug, memberFaction]);
        } catch (error) {
            console.log('ERROR CREATING CHARACTERS: ', error);
            if (error.code === '23505') {
                throw new ExpressError('Character already exists', 400);
            }
            throw error;
        }
    }

    static async connectCharacterToUser(character_id, user_id) {
        try {
            await db.query(`
                UPDATE characters 
                SET user_id = $2
                WHERE character_id = $1
            `, [character_id, user_id]);
        } catch (error) {
            console.log('ERROR CONNECTING CHARACTERS: ', error);
            throw error;
        }
    }

    static async updateCharactersMass(data) {
        try {
            let i = 0;
            const {user_id, date, characters} = data;
            let result = null;

            while(i < characters.length) {
                const {character_id, name, level, character_class, realm_id, realm_name, realm_slug} = characters[i];
                result = db.query(`
                    UPDATE characters 
                    SET character_id = $1, character_name = $2, character_level = $3, character_class = $4, 
                        realm_id = $5, realm_name = $6, realm_slug = $7, user_id = $8, created_at = $9
                    RETURNING character_id, character_name, character_level, character_class, realm_id, realm_name, realm_slug, user_id
                `, [character_id, name, level, character_class, realm_id, realm_name, realm_slug, user_id, date]);
                i++;
            }
            await result;
            return result.rows;
        } catch (error) {
            console.log('UPDATING ERROR', error);
            throw error;
        }
    };

    static async updateCharacter(
        characterId, 
        name = null, 
        level = null, 
        avgItem = null, 
        equipItem = null, 
        achievPoints = null, 
        activeTitle = null, 
        gender = null, 
        faction = null, 
        race = null, 
        charClass = null, 
        activeSpec = null, 
        lastLogin = null, 
        realmId = null, 
        realmName = null,
        characterMoney = null,
        currentLevelDeaths = null,
        totalCharacterDeaths = null,
        currMythicRatingColor = null,
        currMythicRating = null,
        guildId = null,
        raidProfile = null
    ) {
        try {
            await db.query(`
                UPDATE characters 
                SET character_name = $2, character_level = $3, average_item_level = $4, 
                    equipped_item_level = $5, achievement_points = $6, active_title = $7, 
                    character_gender = $8, character_faction = $9, character_race = $10, 
                    character_class = $11, active_spec = $12, last_login = $13, realm_id = $14, 
                    realm_name = $15, current_gold = $16, current_level_deaths = $17, 
                    total_deaths = $18, mythic_rating_color = $19, 
                    mythic_rating = $20, guild_id = $21, raid_profile = $22
                WHERE character_id = $1
            `, [characterId, name, level, avgItem, equipItem, achievPoints, activeTitle, gender, faction, race, charClass, activeSpec, lastLogin, realmId, realmName, characterMoney, currentLevelDeaths, totalCharacterDeaths, currMythicRatingColor, currMythicRating, guildId, raidProfile]);
        } catch (error) {
            console.log('UPDATING ERROR', error);
            throw error;
        }
    };

    static async updateCharacterLeaderboard(memberId, memberName, memberRealmId, memberRealmSlug, memberFaction) {
        try {
            await db.query(`
                UPDATE characters 
                SET character_name = $2, realm_id = $3, realm_slug=$4, character_faction = $5
                WHERE character_id = $1
            `, [memberId, memberName, memberRealmId, memberRealmSlug, memberFaction]);
        } catch (error) {
            console.log('UPDATING updateCharacterLeaderboard ERROR', error);
            throw error;
        }
    };

    static async deleteCharacterByName(characterName) {
        try {
            await db.query(`
                DELETE FROM characters
                WHERE character_name = $1
                RETURNING *
            `, [characterName]);
            return 'Character Deleted';
        } catch (error) {
            console.log('deleteCharacterByName ERROR', error);
            throw error;
        }
    };
};

module.exports = WoWProfileData;