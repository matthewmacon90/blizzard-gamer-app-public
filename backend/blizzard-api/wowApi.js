const axios = require('axios');
const {filterCharacterData, getCurrentDate, compareDates} = require('./blizzard-helpers/wowhelpers.js');
const WoWProfileData = require('../models/wowModel.js');

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
            const dbDate = fetchData.length > 0 ? fetchData[0].date : null;
            const compareDatesResult = compareDates(date, dbDate);

            if(fetchData.length === 0) {
                const result = await axios.get('https://us.api.blizzard.com/profile/user/wow?namespace=profile-us', this.authorizationHeaders);
                const response = filterCharacterData(this.user_id, result.data);

                for (let char of response.characters) {
                    const {character_id, name, level, character_class, faction, gender, realm_id, realm_name, realm_slug} = char;
                    const charExists = await WoWProfileData.getCharacterById(char.character_id);
                    charExists && charExists.character_id === character_id ? await WoWProfileData.connectCharacterToUser(character_id, this.user_id) : 
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
            // console.log('getCharProfile CHAR ID: ', characterId);
            const character = await WoWProfileData.getCharacterById(characterId);
            console.log('CHARACTER: ', character);
            const {realm_slug: realmSlug, character_name: characterName} = character;

            //Protected Character Current Money is here, could use it to add all Gold up for all characters.
            // const result = await axios.get(`https://us.api.blizzard.com/profile/user/wow/protected-character/${character.realm_id}-${characterId}?namespace=profile-us`, this.authorizationHeaders);
            // console.log('result: ', result.data);

            // Specific Character Profile of most things such as guild, total achievements, lastLogin etc.
            // const result = await axios.get(`https://us.api.blizzard.com/profile/wow/character/area-52/zelrus?namespace=profile-us`, this.authorizationHeaders);
            // console.log('CHAR PROFILE: ', result.data);
            
            // const result = await axios.get(`https://us.api.blizzard.com/profile/wow/character/${character.realm_slug}/${character.character_name.toLowerCase()}/achievements/statistics?namespace=profile-us`, this.authorizationHeaders);
            
            //All the periods
            // const periods = await axios.get(`https://us.api.blizzard.com/data/wow/mythic-keystone/period/index?namespace=dynamic-us`, this.authorizationHeaders);
            // console.log('SEASON: ', season.data);
            
            
            //DIFFERENT SEASONS FOR CHAR
            // const result = await axios.get(`https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/mythic-keystone-profile?namespace=profile-us`, this.authorizationHeaders);
            // console.log('CHAR PROFILE: ', result.data);

            // for (let season of result.data.seasons) {
            //     console.log('SEASON: ', season);
            // }

            // BEST RUNS FOR THIS SEASON
            // const result = await axios.get(`https://us.api.blizzard.com/profile/wow/character/area-52/zelrus/mythic-keystone-profile/season/8?namespace=profile-us`, this.authorizationHeaders);
            // console.log('CHAR PROFILE: ', result.data);

            // Character Profile Summary:   Contains overall data with various links
            // const result = await axios.get(`https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}?namespace=profile-us`, this.authorizationHeaders);
            // console.log('CHAR PROFILE: ', result.data);
           
        //    Character Profile Mythic+ lists all the different seasons
        // const result = await axios.get(`https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/mythic-keystone-profile?namespace=profile-us`, this.authorizationHeaders);
        // console.log('CHAR PROFILE: ', result.data);
        // for(let season of result.data.seasons) {  //This gets all the seasons
        //     console.log('SEASON: ', season);
        // }

        // Mythic+ Specific Season contains best runs within that season
        const result = await axios.get(`https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/mythic-keystone-profile/season/9?namespace=profile-us`, this.authorizationHeaders);
        console.log('CHAR PROFILE: ', result.data);


            //Dungeon/Raids is 14807


        } catch (error) {
            console.log('ERROR GET CHAR PROFILE: ',error);
            throw error;
        }
    }
}

module.exports = WoWApi;