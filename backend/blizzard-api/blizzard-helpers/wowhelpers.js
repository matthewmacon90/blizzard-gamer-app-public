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
        userId: user_id,
        date: date && date,
        characters
    };

    return userProfile;
};

const mapCharacterData = (data) => {
    const result = data.map(character => {
        return {
            characterId: character.id,
            name: character.name,
            level: character.level,
            faction: character.faction.name.en_US,
            race: character.playable_race.name.en_US,
            gender: character.gender.name.en_US,
            characterClass: character.playable_class.name.en_US,
            realmId: character.realm.id,
            realmName: character.realm.name.en_US,
            realmSlug: character.realm.slug,
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

    return diffInDays > 5;
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

const cleanCharData = (data) => {
    const currDate = getCurrentDate();
    const epochTime =  data.overAllSummary.last_login_timestamp;
    const date = new Date(epochTime);
    const timestamp = date.toISOString();
    const raidData = data.raidProfile ? cleanRaidProfileData(data.raidProfile) : null;
    console.log(data);


    const result = {
        characterId: data.overAllSummary.id,
        name: data.overAllSummary.name,
        level: data.overAllSummary.level,
        avgItem: data.overAllSummary.average_item_level,
        equipItem: data.overAllSummary.equipped_item_level,
        lastLogin: timestamp,
        achievementPoints: data.overAllSummary.achievement_points ? data.overAllSummary.achievement_points : null,
        characterClass: data.overAllSummary.character_class.name.en_US,
        characterGender: data.overAllSummary.gender.name.en_US,
        activeSpec: data.overAllSummary.active_spec.name.en_US,
        characterFaction: data.overAllSummary.faction.name.en_US,
        characterRace: data.overAllSummary.race.name.en_US,
        characterMoney: data.protectedSummary.money,
        totalCharacterDeaths: data.protectedSummary.protected_stats.total_number_deaths,
        currentLevelDeaths: data.protectedSummary.protected_stats.level_number_deaths,
        activeTitle: data.overAllSummary.active_title ? data.overAllSummary.active_title.name.en_US : null,
        currMythicRating: data.mythicProfile.current_mythic_rating ? data.mythicProfile.current_mythic_rating.rating : null,
        currMythicRatingColor: data.mythicProfile.current_mythic_rating ? data.mythicProfile.current_mythic_rating.color : null,
        raidProfile: raidData,
        realmId: data.overAllSummary.realm.id,
        realmName: data.overAllSummary.realm.name.en_US,
        realmSlug: data.overAllSummary.realm.slug,
        guildId: data.overAllSummary.guild ? data.overAllSummary.guild.id : null,
        guildName: data.overAllSummary.guild ? data.overAllSummary.guild.name : null,
        guildRealmId: data.overAllSummary.guild ? data.overAllSummary.guild.realm.id : null,
        guildRealmSlug: data.overAllSummary.guild ? data.overAllSummary.guild.realm.slug: null,
        guildFaction: data.overAllSummary.guild ? data.overAllSummary.guild.faction.type : null,
        lastUpdated: currDate,
    };

    return result;
};

const cleanRaidProfileData = (data) => {
    const raidData = [];
    const raidExpansions = [];

    if(!data.expansions) return null;

    for(let xpac of data.expansions) {
        raidExpansions.push({expansionName: xpac.expansion.name, expansionId: xpac.expansion.id, expansionRaids: xpac.instances});
    }

    const currentSeason = raidExpansions.length - 1;
    for(let raid of raidExpansions[currentSeason].expansionRaids) {
        raidData.push({raidId: raid.instance.id, raidName: raid.instance.name, raidModes: raid.modes});
    }

    return raidData;
};

const lastUpdatedCheck = (date) => {
    console.log('lastUpdatedCheck DATE: ', date)
    if(!date) return true;
    const currentDate = getCurrentDate();
    const compareDatesResult = compareDates(currentDate, date);
    console.log('lastUpdatedCheck COMPARE DATES: ', compareDatesResult);
    return compareDatesResult;
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
    cleanMemberData,
    isCurrent,
    formatLeaderboardData,
    cleanCharacterData,
    cleanCharData,
    lastUpdatedCheck
};
