const axios = require('axios');
const WoWProfileData = require('../models/wowProfileModel.js');

class WoWApi {
    constructor(token = '') {
        this.token = token;
        this.authorizationHeaders = {headers: {'Authorization': `Bearer ${this.token}`}}
    }
    async getUserInfo() {
        try {
            const result = await axios.get(`https://oauth.battle.net/userinfo`, this.authorizationHeaders);
            console.log(result.data);
            return result.data;
        } catch (error) { 
            console.log(error);
        }
    }

    async getUserProfile() {
        try {
            console.log('AUTH HEADERS: ', this.authorizationHeaders);
            const result = await axios.get('https://us.api.blizzard.com/profile/user/wow?namespace=profile-us', this.authorizationHeaders);
            const {headers, data} = result;
            console.log('HEADERS: ', headers, 'DATA: ', data);
            const apiCallDate = headers.date; //I'm going to use this date to check the date of the last db update and then if it is past a certain time, I will update the db with the new data.
            // await WoWProfileData.createWoWProfileData(data, apiCallDate);
            return data;
        } catch (error) {
            console.log('ERROR GET USER PROFILE: ',error);
        }
    };

    async getCharacterProfile(realm, characterName) {
        try {
            const result = await axios.get(`https://us.api.blizzard.com/profile/wow/character/${realm}/${characterName.toLowerCase()}?namespace=profile-us`, this.authorizationHeaders);
            const {headers, data} = result;
            const apiCallDate = headers.date;
            return data;
        } catch (error) {
            console.log(error);
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