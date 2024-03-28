const axios = require('axios');
const { cleanRealmData} = require('./blizzard-helpers/wowhelpers.js');
const WoWApi = require('./wowApi.js');
const WoWRealmModel = require('../models/realmModel.js');


class WoWRealmApi extends WoWApi {
    constructor(token = '', user_id = null) {
        super(token, user_id);
        this.token = token;
        this.user_id = user_id;
        this.authorizationHeaders = { headers: { 'Authorization': `Bearer ${this.token}` } }
    }

    async fetchRealms() {
        try {
            const connectedRealms = await axios.get('https://us.api.blizzard.com/data/wow/search/connected-realm?namespace=dynamic-us', this.authorizationHeaders);
            const realmData = cleanRealmData(connectedRealms.data);

            for (let realm of realmData) {
                const { realmID, realmName, connectedRealmID, realmSlug } = realm;
                const isRealm = await WoWRealmModel.getRealmById(realmID);
                isRealm ? await WoWRealmModel.updateRealm(realmID, realmName, connectedRealmID, realmSlug) : await WoWRealmModel.insertRealm(realmID, realmName, connectedRealmID, realmSlug);
            }

            const allRealms = await WoWRealmModel.getRealms();
            return allRealms;
        } catch (err) {
            console.log('Realms API ERROR: ', err);
            throw err;
        }
    }
}

module.exports = WoWRealmApi;