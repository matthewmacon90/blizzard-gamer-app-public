const axios = require('axios');

const filterCharacterData = (user_id, data, date=null) => {
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

//PART 2: GUILD ROUTES NOT IN USE AT THE MOMENT

const gatherData = async (headers, realmSlug, guildName) => {
    try {
        //PART 2 For Capstone Project

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
        //Add dungeonLeaderBoard to the database.
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

//PART 2: GUILD ROUTES NOT IN USE AT THE MOMENT
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

//PART 2: GUILD ROUTES NOT IN USE AT THE MOMENT
const gatherDungeonLeaderBoard = async (connectedRealmId, dungeonData, period, headers) => {
    const dungeonIds = dungeonData.map(dungeon => dungeon.id);
    const result = [];
    const leadingGroups = [];

    for(let dungeonId of dungeonIds) {
        const dungeonLeaderBoard = await axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/${connectedRealmId}/mythic-leaderboard/${dungeonId}/period/${period}?namespace=dynamic-us`, headers);
        result.push({data:dungeonLeaderBoard.data});
    }

    for(let row of result) {
        leadingGroups.push(row.data.leading_groups);
    };

    console.log('leadingGroups: ', leadingGroups);
    // console.log('RESULT: ', result[0].data);
    return leadingGroups;
};

//PART 2: GUILD ROUTES NOT IN USE AT THE MOMENT
const gatherMembers = (data) => {
    // console.log('data: ', data[0])
    const groups = [];
    const members = [];

    // for(let i = 0; i < data.length; i++) {
    //     for(let j = 0; j < data[i].length; j++) {
    //         console.log('data[i][j]: ', data[i][j].members[j].profile);
    //     }
    // }
    // console.log('members: ', members);
    // console.log('groups: ', groups[0].data.members);

    // for(let row of groups) {
        // console.log('row: ', row)
        // members.push(row.data.members);
    // }
    // console.log('members: ', members);
};

const cleanMountData = (data) => {
    const mounts = data.map(mount => {
        return {
            mount_id: mount.id,
            mount_name: mount.name.en_US,
        }
    });
    return mounts;
}

const updateMountData = async (data, headers) => {
    try {
        const image = await axios.get(`https://us.api.blizzard.com/data/wow/media/creature-display/${data.creature_displays[0].id}?namespace=static-us`, headers);
        return {
            mount_id: data.id,
            mount_description: data.description ? data.description.en_US : 'No description available',
            mount_faction: data.faction ? data.faction.name.en_US : 'Avaiable to Alliance and Horde',
            mount_source: data.source.name.en_US,
            image_url: image.data.assets[0].value,
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const gatherRealmData = (data) => {
    const realmData = [];
    let i = 0;

    while(i < data.results.length) {
        for(let realm of data.results[i].data.realms) {
            realmData.push({
                realmID: realm.id,
                realmName: realm.name.en_US,
                connectedRealmID: data.results[i].data.id,
                realmSlug: realm.slug,
            });
        }
        i++;
    }
    return realmData;
}



module.exports = {
    getCurrentDate,
    filterCharacterData,
    compareDates,
    gatherData,
    cleanMountData,
    updateMountData,
    gatherRealmData
};