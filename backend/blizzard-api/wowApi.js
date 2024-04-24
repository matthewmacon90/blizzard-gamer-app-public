const axios = require('axios');
const {filterCharacterData, getCurrentDate, compareDates, cleanCharData} = require('./blizzard-helpers/wowhelpers.js');
const WoWProfileData = require('../models/wowModel.js');
const WoWGuildsModel = require('../models/guildsModel.js');

class WoWApi {
    constructor(token = '', user_id = null) {
        this.token = token;
        this.user_id = user_id;
        this.authorizationHeaders = {headers: {'Authorization': `Bearer ${this.token}`}}
    }

    async getUserProfile() {
        try {
            const date = getCurrentDate();
            const fetchData = await WoWProfileData.getCharactersByUserId(this.user_id);
            console.log('FETCH DATA: ', fetchData)
            const dbDate = fetchData.length > 0 ? fetchData[0].date : null;
            const compareDatesResult = compareDates(date, dbDate);

            if(fetchData.length === 0) {
                const result = await axios.get('https://us.api.blizzard.com/profile/user/wow?namespace=profile-us', this.authorizationHeaders);
                console.log('RESULT: ', result.data)
                const response = filterCharacterData(this.user_id, result.data);

                for (let char of response.characters) {
                    const {character_id, name, level, character_class, faction, gender, realm_id, realm_name, realm_slug} = char;
                    const charExists = await WoWProfileData.getCharacterById(char.character_id);
                    charExists && charExists.characterId === character_id ? await WoWProfileData.connectCharacterToUser(character_id, this.user_id) : 
                        await WoWProfileData.insertCharacter(character_id, name, level, character_class, faction, gender, realm_id, realm_name, realm_slug, response.user_id);
                }

                const userProfile = await WoWProfileData.getCharactersByUserId(this.user_id);
                return userProfile;
            }

            if (compareDatesResult) {
                const result = await axios.get('https://us.api.blizzard.com/profile/user/wow?namespace=profile-us', this.authorizationHeaders);
                const response = filterCharacterData(this.user_id, result.data, date);
                const userProfile = await WoWProfileData.updateCharactersMass(response);
                return userProfile;
            }

            return fetchData;
        } catch (error) {
            console.log('ERROR GET USER PROFILE: ',error);
            throw error;
        }
    };

    async getCharProfile(characterId) {
        try {
            const characterApiData = {
                overAllSummary: null,
                protectedSummary: null,
                mythicProfile: null,
                raidProfile: null,
                media: null
            };
            const character = await WoWProfileData.getCharacterById(characterId);
            const {realmSlug, characterName} = character;

            const characterSummary = await axios.get(`https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}?namespace=profile-us`, this.authorizationHeaders);
            const protectedCharacter = await axios.get(`https://us.api.blizzard.com/profile/user/wow/protected-character/${character.realmId}-${characterId}?namespace=profile-us`, this.authorizationHeaders);
            const mythicKeystoneProfile = await axios.get(`https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/mythic-keystone-profile?namespace=profile-us`, this.authorizationHeaders);
            const raidProfile = await axios.get(`https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/encounters/raids?namespace=profile-us`, this.authorizationHeaders);
            // Character Media: Contains the character's avatar, main image, and other images BUT DOES NOT WORK
            // const characterMedia = await axios.get(`https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/character-media?namespace=profile-us`, this.authorizationHeaders);
            
            characterApiData.overAllSummary = characterSummary.data;
            characterApiData.protectedSummary = protectedCharacter.data;
            characterApiData.mythicProfile = mythicKeystoneProfile.data;
            characterApiData.raidProfile = raidProfile.data;

            const data = cleanCharData(characterApiData);
            const stringifyMythicRaidColor = data.currMythicRatingColor ? JSON.stringify(data.currMythicRatingColor) : null;
            const stringifyRaidProfile = data.raidProfile ? JSON.stringify(data.raidProfile) : null;

            if(data.guildId !== null) {
                const isGuild = await WoWGuildsModel.getGuildById(data.guildId);
                console.log('IS GUILD: ', isGuild)
    
                isGuild ? await WoWGuildsModel.updateGuild(data.guildId, data.guildName, null, data.guildRealmId, data.guildRealmSlug, data.guildFaction) :
                    await WoWGuildsModel.insertGuild(data.guildId, data.guildName, null, data.guildRealmId, data.guildRealmSlug, data.guildFaction);
            }
 
            await WoWProfileData.updateCharacter(
                    characterId,
                    data.name,
                    data.level,
                    data.avgItem,
                    data.equipItem,
                    data.achievementPoints=null,
                    data.activeTitle,
                    data.characterGender,
                    data.characterFaction,
                    data.characterRace,
                    data.characterClass,
                    data.activeSpec,
                    data.lastLogin,
                    data.realmId,
                    data.realmName,
                    data.characterMoney,
                    data.currentLevelDeaths,
                    data.totalCharacterDeaths,
                    stringifyMythicRaidColor,
                    data.currMythicRating,
                    data.guildId,
                    stringifyRaidProfile
                );

            const currentCharacter = await WoWProfileData.getCharacterById(characterId);
            return currentCharacter;

        } catch (error) {
            console.log('ERROR GET CHAR PROFILE: ',error);
            throw error;
        }
    }
}

module.exports = WoWApi;