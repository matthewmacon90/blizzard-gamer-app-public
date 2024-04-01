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
        const leaderboardId = `${dungeon.dungeonId}-${dungeon.periodId}-${dungeon.connectedRealmId}`;
        return {
            leaderboardId,
            dungeonId: dungeon.dungeonId,
            dungeonName: dungeon.dungeonName,
            periodId: dungeon.periodId,
            connectedRealmId: dungeon.connectedRealmId,
            leadingGroups: dungeon.leaderboardData.leading_groups,
            affixes: dungeon.leaderboardData.keystone_affixes
        }
    });
};

const cleanMemberData = (dungeonData) => {
    let i = 0;
    let j = 0;
    let k = 0;
    const leadingGroups = [];
    const members = [];
    const characters = [];

    while (i < dungeonData.length) {
        leadingGroups.push({groups: dungeonData[i].leadingGroups});
        i++;
    }

    while (j < leadingGroups.length) {
        for(let i = 0; i < leadingGroups[j].groups.length; i++) {
            members.push({member: leadingGroups[j].groups[i].members});
        }
        j++;
    }

    while (k < members.length) {
        for(let i = 0; i < members[k].member.length; i++) {
            characters.push({
                memberId: members[k].member[i].profile.id,
                memberName: members[k].member[i].profile.name,
                memberRealmId: members[k].member[i].profile.realm.id,
                memberRealmSlug: members[k].member[i].profile.realm.slug,
                memberFaction: members[k].member[i].faction.type,
            });
        }
        k++;
    }

    return characters;
}

const isCurrent = (dbDate) => {
    const date = getCurrentDate();
    const compareDatesResult = compareDates(date, dbDate);
};

const formatLeaderboardData = (data) => {
    return data.map(leaderboard => {
        return {
            leaderboardId: leaderboard.leaderboard_id,
            dungeonId: leaderboard.dungeon_id,
            dungeonName: leaderboard.dungeon_name,
            periodId: leaderboard.current_period_leaderboard,
            leadingGroups: JSON.parse(leaderboard.leading_groups),
            affixes: JSON.parse(leaderboard.affixes),
            connectedRealmId: leaderboard.connected_realm_id,
        }
    });
};

const cleanCharacterData = (data) => {
    const epochTime =  data.last_login_timestamp;
    const date = new Date(epochTime);
    const timestamp = date.toISOString();

    const result = {
        characterId: data.id,
        name: data.name,
        level: data.level,
        averageItemLevel: data.average_item_level,
        equippedItemLevel: data.equipped_item_level,
        achievementPoints: data.achievement_points,
        activeTitle: data.active_title ? data.active_title.name.en_US : null,
        gender: data.gender.name.en_US,
        faction: data.faction.name.en_US,
        race: data.race.name.en_US,
        characterClass: data.character_class.name.en_US,
        activeSpec: data.active_spec.name.en_US,
        lastLogin: timestamp,
        realmId: data.realm.id,
        realmName: data.realm.name.en_US,
        guildId: data.guild ? data.guild.id : null,
        guildName: data.guild ? data.guild.name : null,
        guildRealmId: data.guild ? data.guild.realm.id : null,
        guildRealmSlug: data.guild ? data.guild.realm.slug: null,
        guildFaction: data.guild ? data.guild.faction.type : null,
    };
    return result;
}

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
    cleanMemberData,
    isCurrent,
    formatLeaderboardData,
    cleanCharacterData
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