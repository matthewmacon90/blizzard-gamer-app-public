const axios = require('axios');
const { cleanRealmData, cleanDungeonLeaderBoardIdx, cleanDungeonData, cleanKeyStoneData, cleanLeadingGroups } = require('./blizzard-helpers/wowhelpers.js');
const WoWProfileData = require('../models/wowModel.js');
const WoWApi = require('./wowApi.js');
const WoWDungeonModel = require('../models/dungeonModel.js');
const WoWRealmModel = require('../models/realmModel.js');

class WoWDungeonApi extends WoWApi {
    constructor(token = '', user_id = null) {
        super(token, user_id);
        this.token = token;
        this.user_id = user_id;
        this.authorizationHeaders = { headers: { 'Authorization': `Bearer ${this.token}` } }
    }

    async getLeaderBoardIdx(connectedRealmId) {
        try {
            const result = await axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/${connectedRealmId}/mythic-leaderboard/index?namespace=dynamic-us`, this.authorizationHeaders);
            const currentPeriod = await axios.get(`https://us.api.blizzard.com/data/wow/mythic-keystone/period/index?namespace=dynamic-us`, this.authorizationHeaders);
            const leaderBoardIdx = cleanDungeonLeaderBoardIdx(result.data.current_leaderboards, currentPeriod.data.current_period.id);
            const keyStoneLeaderBoardApi =[];

            for (let dungeon of leaderBoardIdx) {
                const {dungeonId, dungeonName, periodId} = dungeon;
                const leaderboard = await axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/${connectedRealmId}/mythic-leaderboard/${dungeonId}/period/${periodId}?namespace=dynamic-us`, this.authorizationHeaders);
                keyStoneLeaderBoardApi.push({dungeonId, dungeonName, periodId, leaderboardData: leaderboard.data});
            }
            const formattedKeyStoneData = cleanKeyStoneData(keyStoneLeaderBoardApi);
            const data = cleanLeadingGroups(formattedKeyStoneData); //Taking a closer look at this function to determine what needs to go to the DB.

            return formattedKeyStoneData;
        } catch (err) {
            console.log('ERROR GET LEADERBOARD IDX: ', err);
            throw err;
        }
    }
}

module.exports = WoWDungeonApi;