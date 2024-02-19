const axios = require('axios');

class WoWApi {
    constructor(token = '') {
        this.token = token;
    }

    async getUserProfile() {
        try {
            console.log('TOKEN IN WOW', this.token);
            const headers = `Bearer ${this.token}`
            const result = await axios.get('https://us.api.blizzard.com/profile/user/wow?namespace=profile-us', {
                headers: {
                    'Authorization': headers
                }
            });
            // console.log('RESULT IN WOW API', result);
            return result.data;
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports = WoWApi;