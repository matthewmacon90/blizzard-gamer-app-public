const axios = require('axios');
const { gatherRealmData } = require('./blizzard-helpers/wowhelpers.js');
const WoWProfileData = require('../models/wowModel.js');
const WoWApi = require('./wowApi.js');
const WoWDungeonModel = require('../models/dungeonModel.js');

//PART 2: GUILD ROUTES NOT IN USE AT THE MOMENT

class WoWDungeonApi extends WoWApi {
    constructor(token = '', user_id = null) {
        super(token, user_id);
        this.token = token;
        this.user_id = user_id;
        this.authorizationHeaders = { headers: { 'Authorization': `Bearer ${this.token}` } }
    }

    async getDungeons() {
        try {
            const connectedRealms = await axios.get('https://us.api.blizzard.com/data/wow/search/connected-realm?namespace=dynamic-us', this.authorizationHeaders);
            const realmData = gatherRealmData(connectedRealms.data);
            console.log('REALM DATA: ', realmData);

            // const periodIndex = await axios.get('https://us.api.blizzard.com/data/wow/mythic-keystone/period/index?namespace=dynamic-us', this.authorizationHeaders);
            // console.log('PERIOD INDEX: ', periodIndex.data.current_period.id);

            // const mythicKeystoneLeaderBoardIndex = await axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/1072/mythic-leaderboard/index?namespace=dynamic-us`, this.authorizationHeaders);
            // console.log('MYTHIC KEYSTONE LEADERBOARD INDEX: ', mythicKeystoneLeaderBoardIndex.data.current_leaderboards);

            // const mythicKeystoneLeaderBoard = await axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/1072/mythic-leaderboard/456/period/949?namespace=dynamic-us`, this.authorizationHeaders);
            // console.log('MYTHIC KEYSTONE LEADERBOARD: ', mythicKeystoneLeaderBoard.data.leading_groups[0].members[0].profile);

        } catch (err) {
            console.log('ERROR GET DUNGEONS: ', err);
            throw err;
        }
    }
}


//PART 2 For Capstone Project
//1072
// const connectedRealms = await axios.get('https://us.api.blizzard.com/data/wow/search/connected-realm?namespace=dynamic-us', this.authorizationHeaders);
// console.log('CONNECTED REALM ID: ', connectedRealms.data);

// const periodIndex = await axios.get('https://us.api.blizzard.com/data/wow/mythic-keystone/period/index?namespace=dynamic-us', this.authorizationHeaders);
// console.log('PERIOD INDEX: ', periodIndex.data.current_period.id);

// const mythicKeystoneLeaderBoardIndex = await axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/1072/mythic-leaderboard/index?namespace=dynamic-us`, this.authorizationHeaders);
// console.log('MYTHIC KEYSTONE LEADERBOARD INDEX: ', mythicKeystoneLeaderBoardIndex.data.current_leaderboards);

// const mythicKeystoneLeaderBoard = await axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/1072/mythic-leaderboard/456/period/949?namespace=dynamic-us`, this.authorizationHeaders);
// console.log('MYTHIC KEYSTONE LEADERBOARD: ', mythicKeystoneLeaderBoard.data.leading_groups[0].members[0].profile);

// const memberProfile = await axios.get(`https://us.api.blizzard.com/profile/wow/character/sargeras/joyeus?namespace=profile-us`, this.authorizationHeaders);
// console.log('MEMBER PROFILE: ', memberProfile.data);

// const result = await axios.get(`https://us.api.blizzard.com/data/wow/mythic-keystone/dungeon/index?namespace=dynamic-us`, this.authorizationHeaders);
// console.log('RESULT: ', result.data);

module.exports = WoWDungeonApi;