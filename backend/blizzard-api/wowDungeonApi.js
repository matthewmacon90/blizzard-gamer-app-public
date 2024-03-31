const axios = require('axios');
const {cleanDungeonLeaderBoardIdx, cleanKeyStoneData, cleanMemberData, isCurrent } = require('./blizzard-helpers/wowhelpers.js');
const WoWApi = require('./wowApi.js');
const WoWDungeonModel = require('../models/dungeonModel.js');
const WoWProfileData = require('../models/wowModel.js');
const WoWRealmModel = require('../models/realmModel.js');
const WoWLeaderboardModel = require('../models/leaderboardModel.js');

class WoWDungeonApi extends WoWApi {
    constructor(token = '', user_id = null) {
        super(token, user_id);
        this.token = token;
        this.user_id = user_id;
        this.authorizationHeaders = { headers: { 'Authorization': `Bearer ${this.token}` } }
    }

    async getLeaderBoardIdx(connectedRealmId) {
        try {
            // const checkDataDate = await WoWLeaderboardModel.getLeaderboardById();
            // const dbDate = checkDataDate.length > 0 ? checkDataDate[0].date : null;
            // const compareDatesResult = isCurrent(dbDate);

            const result = await axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/${connectedRealmId}/mythic-leaderboard/index?namespace=dynamic-us`, this.authorizationHeaders);
            const currentPeriod = await axios.get(`https://us.api.blizzard.com/data/wow/mythic-keystone/period/index?namespace=dynamic-us`, this.authorizationHeaders);
            const leaderBoardIdx = cleanDungeonLeaderBoardIdx(result.data.current_leaderboards, currentPeriod.data.current_period.id);
            const keyStoneLeaderBoardApi =[];

            for (let dungeon of leaderBoardIdx) {
                const {dungeonId, dungeonName, periodId} = dungeon;
                const leaderboard = await axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/${connectedRealmId}/mythic-leaderboard/${dungeonId}/period/${periodId}?namespace=dynamic-us`, this.authorizationHeaders);
                keyStoneLeaderBoardApi.push({dungeonId, dungeonName, periodId, connectedRealmId, leaderboardData: leaderboard.data});
            }

            const formattedKeyStoneData = cleanKeyStoneData(keyStoneLeaderBoardApi);
            const formattedMemberData = cleanMemberData(formattedKeyStoneData);

            for (let dungeon of formattedKeyStoneData) {
                const {leaderboardId, dungeonId, dungeonName, periodId, connectedRealmId, leadingGroups, affixes} = dungeon;
                const leadingGroupsString = JSON.stringify(leadingGroups);
                const affixesString = JSON.stringify(affixes);

                const isDungeon = await WoWDungeonModel.getDungeonById(dungeonId);
                isDungeon ? await WoWDungeonModel.updateDungeon(periodId, dungeonId)
                    : await WoWDungeonModel.insertDungeon(dungeonId, dungeonName, periodId);

                const isLeaderboard = await WoWLeaderboardModel.getLeaderboardById(leaderboardId);
                isLeaderboard ? await WoWLeaderboardModel.updateLeaderboard(leadingGroupsString, affixesString, dungeonId, periodId, leaderboardId)
                    : await WoWLeaderboardModel.insertLeaderboard(dungeonId, periodId, leadingGroupsString, affixesString, leaderboardId, connectedRealmId);
            }

            for (let char of formattedMemberData) {
                const {memberId, memberName, memberRealmId, memberRealmSlug, memberFaction} = char;
                
                const isChar = await WoWProfileData.getCharacterById(memberId);
                isChar ? await WoWProfileData.updateCharacterLeaderboard(memberId, memberName, memberRealmId, memberRealmSlug, memberFaction) 
                    : await WoWProfileData.createCharacterLeaderboard(memberId, memberName, memberRealmId, memberRealmSlug, memberFaction);
            }

            return formattedKeyStoneData;
        } catch (err) {
            console.log('ERROR GET LEADERBOARD IDX: ', err);
            throw err;
        }
    }
}

module.exports = WoWDungeonApi;