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
            const fetchData = await WoWProfileData.checkDb(this.user_id);
            const dbDate = fetchData.length > 0 ? fetchData[0].date : null;
            const compareDatesResult = compareDates(date, dbDate);


            if(fetchData.length === 0) {
                const result = await axios.get('https://us.api.blizzard.com/profile/user/wow?namespace=profile-us', this.authorizationHeaders);
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
}

module.exports = WoWApi;