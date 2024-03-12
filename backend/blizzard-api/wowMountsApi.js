const axios = require('axios');
const {cleanMountData, updateMountData} = require('./blizzard-helpers/wowhelpers.js');
const WoWApi = require('./wowApi.js');
const MountsModel = require('../models/mountsModel.js');

class WoWMountsApi extends WoWApi {
    constructor(token = '', user_id = null) {
        super(token, user_id);
        this.token = token;
        this.user_id = user_id;
        this.authorizationHeaders = {headers: {'Authorization': `Bearer ${this.token}`}}
    }

    async getMounts () {
        try {
            const result = await axios.get(`https://us.api.blizzard.com/data/wow/mount/index?namespace=static-us`, this.authorizationHeaders);
            const mounts = cleanMountData(result.data.mounts);
            await MountsModel.insertMounts(mounts);

        } catch (err) {
            console.log('ERROR GET MOUNTS: ',err);
            throw err;
        }
    }

    async getMountData(mountId) {
        try {
            const result = await axios.get(`https://us.api.blizzard.com/data/wow/mount/${mountId}?namespace=static-us`, this.authorizationHeaders);
            const mount = await updateMountData(result.data, this.authorizationHeaders);
            return mount;
        } catch (err) {
            console.log('ERROR GET MOUNT DATA: ', err);
            throw err;
        }
    }
};

module.exports = WoWMountsApi;