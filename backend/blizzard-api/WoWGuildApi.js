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
            console.log('DATA buildGuildProfile: ', data, periodIndex.data.current_period.id);
            // const result = await axios.get(`https://us.api.blizzard.com/data/wow/guild/${realmSlug}/${guildName.toLowerCase()}?namespace=profile-us`, this.authorizationHeaders);

        } catch (error) {
            console.log(error);
        }
    }

    //Not working at the moment.
    async getGuilds(realmSlug) {
        try {
            const response = await this.buildGuildProfile(realmSlug);
            // console.log('roster: ', roster.data.members.roster[0].character.key);
        } catch (error) {
            console.log('getGuilds:', error);
        }
    }
}

module.exports = WoWGuildApi;