const axios = require('axios');
const {filterCharacterData, getCurrentDate, compareDates, gatherData} = require('./blizzard-helpers/wowhelpers.js');
const WoWApi = require('./wowApi.js');

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
            const data = await gatherData(this.authorizationHeaders, realmSlug, guildName);
            const periodIndex = await axios.get('https://us.api.blizzard.com/data/wow/mythic-keystone/period/index?namespace=dynamic-us', this.authorizationHeaders);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = WoWGuildApi;