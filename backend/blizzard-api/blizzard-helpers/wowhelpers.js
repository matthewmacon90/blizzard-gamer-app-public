const axios = require('axios');

const filterCharacterData = (user_id, data, date=null) => {
    console.log('USER ID: ', user_id, typeof user_id)
    const {wow_accounts} = data;
    let i = 0;
    const results = [];

    while(i < wow_accounts.length) {
        wow_accounts[i].characters.forEach(character => {
            results.push(character);
        });
        i++;
    }
    const characters = mapCharacterData(results);
    const userProfile = {
        user_id,
        date: date && date,
        characters
    };

    return userProfile;
};

const mapCharacterData = (data) => {
    const result = data.map(character => {
        return {
            character_id: character.id,
            name: character.name,
            level: character.level,
            faction: character.faction.name.en_US,
            race: character.playable_race.name.en_US,
            gender: character.gender.name.en_US,
            character_class: character.playable_class.name.en_US,
            realm_id: character.realm.id,
            realm_name: character.realm.name.en_US,
            realm_slug: character.realm.slug,
        }
    });
    return result;
};

const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString();
};

const compareDates = (currentDate, dbDate=null) => {
    if(!dbDate) return false;
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diffInMilliseconds = Math.abs(currentDate - dbDate);
    const diffInDays = Math.ceil(diffInMilliseconds / millisecondsPerDay);

    return diffInDays === 5;
};

const gatherData = async (headers, realmSlug, guildName) => {
    try {
        // const formattedName = formatName(guildName);
        // console.log('FORMATTED NAME: ', formattedName);
        const realmData = await axios.get(`https://us.api.blizzard.com/data/wow/realm/${realmSlug}?namespace=dynamic-us`, headers);
        const periodIndex = await axios.get('https://us.api.blizzard.com/data/wow/mythic-keystone/period/index?namespace=dynamic-us', headers);
        const currentPeriod = periodIndex.data.current_period.id;
        // console.log('REALM DATA: ', realmData.data);
        const formattedRealmData = cleanRealmData(realmData.data);
        const {connectedRealmId} = formattedRealmData;
        const mythicRealmBoard = await axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/${connectedRealmId}/mythic-leaderboard/index?namespace=dynamic-us`, headers);
        const formattedDungeonData = cleanDungeonData(mythicRealmBoard.data.current_leaderboards);

        const dungeonLeaderBoard = await gatherDungeonLeaderBoard(connectedRealmId, formattedDungeonData, currentPeriod, headers);
        const leadingMembers = gatherMembers(dungeonLeaderBoard);
        // console.log('formattedDungeonData: ', formattedDungeonData);
        // console.log('FORMATTED REALM DATA: ', formattedRealmData);
        // console.log('dungeonLeaderBoard: ', dungeonLeaderBoard);
        console.log('leadingMembers: ', leadingMembers);


    } catch (err) {
        console.log('ERROR GATHER DATA: ', err);
        throw err;
    }
};

const formatName = (name) => {
    return name.toLowerCase().replaceAll(' ', '-');
};

const cleanRealmData = (data) => {
    const {id, name, connected_realm, slug} = data;
    let connectedRealmID = connected_realm.href.slice(53);
    connectedRealmID = connectedRealmID.split('?')[0];
    return {
        id,
        name: name.en_US,
        connectedRealmId: connectedRealmID,
        slug
    };
};

const cleanDungeonData = (data) => {
    return (
        data.map((dungeon) => {
            return {
                id: dungeon.id,
                name: dungeon.name.en_US,
            }
        })
    );
};

const gatherDungeonLeaderBoard = async (connectedRealmId, dungeonData, period, headers) => {
    const dungeonIds = dungeonData.map(dungeon => dungeon.id);
    const result = [];

    for(let dungeonId of dungeonIds) {
        const dungeonLeaderBoard = await axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/${connectedRealmId}/mythic-leaderboard/${dungeonId}/period/${period}?namespace=dynamic-us`, headers);
        result.push({data:dungeonLeaderBoard.data});
    }
    console.log('RESULT: ', result);
    return result;
};

const gatherMembers = (data) => {
    const groups = [];
    const members = [];

    for(let row of data) {
        // console.log('row: ', row)
        groups.push(row.data.leading_groups);
    }
 
    console.log('groups: ', groups[0].data.members);

    for(let row of groups) {
        // console.log('row: ', row)
        // members.push(row.data.members);
    }
    // console.log('members: ', members);
};

const cleanMountData = (data) => {
    console.log('DATA: ', data);
    // console.log('DATA CREATURE: ', data.creature_displays[0]);
    const mounts = data.map(mount => {
        return {
            mount_id: mount.id,
            mount_name: mount.name.en_US,
        }
    });
    return mounts;
}

const updateMountData = async (data, headers) => {
    console.log('DATA: ', data);
    const image = await axios.get(`https://us.api.blizzard.com/data/wow/media/creature-display/${data.creature_displays[0].id}?namespace=static-us`, headers);
    console.log('IMAGE: ', image.data.assets[0].value);
    try {
        return {
            mount_id: data.id,
            mount_description: data.description.en_US,
            mount_faction: data.faction.name.en_US,
            mount_source: data.source.name.en_US,
            image_url: image.data.assets[0].value,
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};



module.exports = {
    getCurrentDate,
    filterCharacterData,
    compareDates,
    gatherData,
    cleanMountData,
    updateMountData
};