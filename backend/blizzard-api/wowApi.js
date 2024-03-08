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
            console.log('DATE: ', date);
            const fetchData = await WoWProfileData.checkDb(this.user_id);
            const dbDate = fetchData.length > 0 ? fetchData[0].date : null;
            console.log('FETCH DATA: ', fetchData);
            const compareDatesResult = compareDates(date, dbDate);
            console.log('COMPARE DATES RESULT: ', compareDatesResult);

            if(fetchData.length === 0) {
                const result = await axios.get('https://us.api.blizzard.com/profile/user/wow?namespace=profile-us', this.authorizationHeaders);
                console.log('RESULT: ', result.data.code);
                const response = filterCharacterData(this.user_id, result.data);
                const userProfile = await WoWProfileData.createCharacters(response);
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


    //Not working at the moment.
    async getGuildProfile(realm, guildName) {
        try {
            const result = await axios.get(`https://us.api.blizzard.com/data/wow/guild/${realm}/${guildName.toLowerCase()}?namespace=profile-us`, this.authorizationHeaders);
            const {headers, data} = result;
            const apiCallDate = headers.date;
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = WoWApi;