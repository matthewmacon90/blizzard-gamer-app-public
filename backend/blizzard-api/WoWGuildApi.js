const axios = require('axios');
const {cleanCharacterData} = require('./blizzard-helpers/wowhelpers.js');
const WoWApi = require('./wowApi.js');
const WoWRealmModel = require('../models/realmModel.js');
const WoWProfileData = require('../models/wowModel.js');
const WoWGuildsModel = require('../models/guildsModel.js');

//PART 2: GUILD ROUTES NOT IN USE AT THE MOMENT

class WoWGuildApi extends WoWApi {
    constructor(token = '', user_id = null) {
        super(token, user_id);
        this.token = token;
        this.user_id = user_id;
        this.authorizationHeaders = {headers: {'Authorization': `Bearer ${this.token}`}}
    }

    async buildGuildProfile(realmSlug, guildName=null) {
        try {
            const realm = await WoWRealmModel.getRealmBySlug(realmSlug);
            const charactersByRealm = await WoWProfileData.getCharactersByRealmId(realm.realm_id);
            console.log('charactersByRealm', charactersByRealm.length);

            for (let character of charactersByRealm) {
                const characterLower = character.character_name.toLowerCase();
                try {
                    await axios.get(`https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterLower}/status?namespace=profile-us`, this.authorizationHeaders);
                } catch (error) {
                    if (error.response.status === 404) {
                        const deletedChar = await WoWProfileData.deleteCharacterByName(character.character_name);
                        console.log('deletedChar', deletedChar);
                    }
                }
            }

            const charactersByRealmUpdated = await WoWProfileData.getCharactersByRealmId(realm.realm_id);

            for (let character of charactersByRealmUpdated) {
                const characterLower = character.character_name.toLowerCase();
                const characterData = await axios.get(`https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterLower}?namespace=profile-us`, this.authorizationHeaders);
                const char = cleanCharacterData(characterData.data);
                const {guildId, guildName, guildRealmId, guildRealmSlug, guildFaction} = char;

                await WoWProfileData.updateCharacter(
                    char.characterId, 
                    char.name, 
                    char.level, 
                    char.averageItemLevel,
                    char.equippedItemLevel,
                    char.achievementPoints,
                    char.activeTitle,
                    char.gender,
                    char.faction,
                    char.race,
                    char.characterClass, 
                    char.activeSpec,
                    char.lastLogin,
                    char.realmId,
                    char.realmName);
                
                    guildId ? await WoWGuildsModel.insertGuild(guildId, guildName, guildRealmId, guildRealmSlug, guildFaction) : null;
            }

            const guildsByRealm = await WoWGuildsModel.getGuildsByRealmId(realm.realm_id);
            console.log('guildsByRealm', guildsByRealm, guildsByRealm.length);
            // const characterData = await axios.get(`https://us.api.blizzard.com/profile/wow/character/area-52/zelrus?namespace=profile-us`, this.authorizationHeaders);

            // const formattedCharacterData = cleanCharacterData(characterData.data);

            // const data = await gatherData(this.authorizationHeaders, realmSlug, guildName);
            // const periodIndex = await axios.get('https://us.api.blizzard.com/data/wow/mythic-keystone/period/index?namespace=dynamic-us', this.authorizationHeaders);
        } catch (error) {
            console.log('buildGuildProfile', error);
        }
    }
}

module.exports = WoWGuildApi;