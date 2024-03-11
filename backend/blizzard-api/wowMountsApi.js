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
            //Mount image: https://render.worldofwarcraft.com/us/npcs/zoom/creature-display-19482.jpg

            const result = await axios.get(`https://us.api.blizzard.com/data/wow/mount/index?namespace=static-us`, this.authorizationHeaders);
            const mounts = cleanMountData(result.data.mounts);
            console.log('MOUNTS: ', mounts);
            const response = await MountsModel.insertMounts(mounts);
            console.log('RESPONSE: ', response);
            // const mountDetails = await axios.get(`https://us.api.blizzard.com/data/wow/mount/161?namespace=static-10.2.5_52554-us`, this.authorizationHeaders);
            // const mountImage = await axios.get(`https://us.api.blizzard.com/data/wow/media/creature-display/19482?namespace=static-10.2.5_52554-us`, this.authorizationHeaders);
            // console.log('RESULT MOUNTS: ', result.data.mounts);
            // console.log('mountDetails : ', mountDetails.data.creature_displays);
            // console.log('mountDetails: ', mountDetails.data.requirements);
            // console.log('mountImage: ', mountImage.data.assets);
        } catch (err) {
            console.log('ERROR GET MOUNTS: ',err);
            throw err;
        }
    }

    async getMountData(mountId) {
        try {
            const result = await axios.get(`https://us.api.blizzard.com/data/wow/mount/${mountId}?namespace=static-us`, this.authorizationHeaders);
            // console.log('RESULT MOUNT DATA: ', result.data);
            const mount = await updateMountData(result.data, this.authorizationHeaders);
            // console.log('MOUNT: ', mount);
            // console.log('RESULT MOUNT DATA: ', result.data);
            return mount;
        } catch (err) {
            console.log('ERROR GET MOUNT DATA: ', err);
            throw err;
        }
    }
};

module.exports = WoWMountsApi;