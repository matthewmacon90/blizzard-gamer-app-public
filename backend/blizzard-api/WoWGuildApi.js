const axios = require('axios');
const {filterCharacterData, getCurrentDate, compareDates} = require('./blizzard-helpers/wowhelpers.js');
const WoWApi = require('./wowApi.js');

class WoWGuildApi extends WoWApi {
    constructor(token = '', user_id = null) {
        super(token, user_id);
        this.token = token;
        this.user_id = user_id;
        this.authorizationHeaders = {headers: {'Authorization': `Bearer ${this.token}`}}
    }

    //Not working at the moment.
    async getGuilds(realmSlug) {
        try {
            console.log()
            console.log('REALM SLUG: ', realmSlug)
            // const result = await axios.get(`https://us.api.blizzard.com/data/wow/realm/${realmSlug}?namespace=dynamic-us`, this.authorizationHeaders);
            const result = await axios.get(`https://us.api.blizzard.com/data/wow/search/realm/${realmSlug}?namespace=dynamic-us`, this.authorizationHeaders);
            console.log('RESULT: ', result.data);
        } catch (error) {
            console.log('getGuilds:', error);
        }
    }
}

module.exports = WoWGuildApi;