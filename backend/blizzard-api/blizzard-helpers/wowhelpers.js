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

    return diffInDays === 2;
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
        console.log(err);
        throw err;
    }
};

const cleanRealmData = (data) => {
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

const cleanDungeonLeaderBoardIdx = (data, currentPeriod) => {
    return data.map(dungeon => {
        return {
            dungeonId: dungeon.id,
            dungeonName: dungeon.name.en_US,
            periodId: currentPeriod,
        }
    });
};

const cleanKeyStoneData = (keystoneData) => {
    return keystoneData.map(dungeon => {
        return {
            dungeonId: dungeon.dungeonId,
            dungeonName: dungeon.dungeonName,
            periodId: dungeon.periodId,
            connectedRealmId: dungeon.connectedRealmId,
            leadingGroups: dungeon.leaderboardData.leading_groups,
            affixes: dungeon.leaderboardData.keystone_affixes
        }
    });
};

const cleanLeadingGroups = (dungeonData) => {
    let i = 0;
    const results = [];

    while (i < dungeonData.length) {
        for(let group of dungeonData[i].leadingGroups) {
            for(let member of dungeonData[i].leadingGroups[i].members) {
                const leaderboardId = `${dungeonData[i].dungeonId}-${dungeonData[i].periodId}-${member.profile.id}-${group.ranking}`;
                results.push({
                    leaderboardId,
                    dungeonId: dungeonData[i].dungeonId,
                    dungeonName: dungeonData[i].dungeonName,
                    periodId: dungeonData[i].periodId,
                    connectedRealmId: dungeonData[i].connectedRealmId,
                    groupRanking: group.ranking,
                    groupKeyStoneLevel: group.keystone_level,
                    mythicRating: group.mythic_rating.rating,
                    mythicRatingColor: group.mythic_rating.color,
                    memberId: member.profile.id,
                    memberName: member.profile.name,
                    memberRealm: member.profile.realm.id,
                    memberFaction: member.faction.type
                });
            }
        }
        i++;
    }
    return results;
}

const formatLeaderboardData = (dungeonData, leaderboardData) => {
    console.log('dungeonData: ', dungeonData, 'leaderboardData: ', leaderboardData);
    let i = 0;
    const results = [];
    while(i < dungeonData.length) { 
        for(let group of leaderboardData) {
            console.log('group: ', group);
            results.push({

            });
        }
        i++;
    }
};

const isCurrent = (dbDate) => {
    const date = getCurrentDate();
    const compareDatesResult = compareDates(date, dbDate);
};

module.exports = {
    getCurrentDate,
    filterCharacterData,
    compareDates,
    cleanMountData,
    updateMountData,
    cleanRealmData,
    cleanDungeonLeaderBoardIdx,
    cleanDungeonData,
    cleanKeyStoneData,
    cleanLeadingGroups,
    isCurrent,
    formatLeaderboardData
};




// if(fetchData.length === 0) {
//     const result = await axios.get('https://us.api.blizzard.com/profile/user/wow?namespace=profile-us', this.authorizationHeaders);
//     const response = filterCharacterData(this.user_id, result.data);
    
//     for(let char of response.characters) {
//         const {character_id, name, level, character_class, faction, gender, realm_id, realm_name, realm_slug} = char;
//         await WoWProfileData.insertCharacter(character_id, name, level, character_class, faction, gender, realm_id, realm_name, realm_slug, response.user_id);
//     }

//     const userProfile = await WoWProfileData.getCharactersByUserId(this.user_id);
//     return userProfile;
// }

// if (compareDatesResult) {
//     const result = await axios.get('https://us.api.blizzard.com/profile/user/wow?namespace=profile-us', this.authorizationHeaders);
//     const response = filterCharacterData(this.user_id, result.data, date);
//     const userProfile = await WoWProfileData.updateCharactersMass(response);
//     return userProfile;
// }