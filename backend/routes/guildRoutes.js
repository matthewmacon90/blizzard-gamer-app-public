const express = require('express');
const router = express.Router();
const WoWGuildApi = require('../blizzard-api/WoWGuildApi.js');

router.get('/', async (req, res, next) => {
    try {
        console.log('req: ', req.query.realmSlug);
        const wowGuildApi = new WoWGuildApi();
        const result = await wowGuildApi.getGuilds(req.query.realmSlug);
        console.log('RESULT GUILDS ROUTE: ', result);
        return res.status(200).json('Hello from guildRoutes');
    } catch (error) {
        console.log('GUILD ROUTES ERROR', error);
        next(error);
    }
});

module.exports = router;