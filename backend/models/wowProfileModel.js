// const WoWApi = require('../blizzard-api/wowapi.js');

class WoWProfile {
    static async getProfile (token) {
        try {
            const result = await WoWApi.getUserProfile(token);
            console.log('result IN MODEL: ', result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = WoWProfile;