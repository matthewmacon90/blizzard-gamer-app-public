DROP DATABASE IF EXISTS "sons-of-thunder";
CREATE DATABASE "sons-of-thunder";
\c "sons-of-thunder";

-- Need to create roles for users based off of guild permissions, but if not guild member, then default to standard user.
CREATE TABLE IF NOT EXISTS "users" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role TEXT NOT NULL DEFAULT 'standard-user',
    premium_account_level INTEGER DEFAULT 0 NOT NULL,
    battlenet_id VARCHAR(255) UNIQUE,
    battle_tag VARCHAR(255) UNIQUE,
    battlenet_token VARCHAR(255),
    btoken_expires TIMESTAMP,
    discord_name VARCHAR(255) UNIQUE,
    accepted_privacy_policy BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "realms" (
    realm_id INT PRIMARY KEY,
    realm_name VARCHAR(255) NOT NULL,
    realm_slug VARCHAR(255) NOT NULL,
    connected_realm_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "dungeons" (
    dungeon_id INT UNIQUE PRIMARY KEY,
    dungeon_name VARCHAR(255) UNIQUE NOT NULL,
    current_period INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "guilds" (
    guild_id INT PRIMARY KEY,
    guild_name VARCHAR(30),
    guild_description TEXT,
    guild_faction VARCHAR(255),
    guild_realm_id INT REFERENCES realms(realm_id) ON DELETE CASCADE,
    guild_realm_slug VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "guild_members" (
    guild_member_id INT PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    guild_id INT REFERENCES guilds(guild_id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Maybe change created_at to lastest_update or something similar.
CREATE TABLE IF NOT EXISTS "characters" (
    character_id INT PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    guild_id INT REFERENCES guilds(guild_id),
    guild_applications TEXT,
    guild_rank INT DEFAULT 0 NOT NULL,
    guild_role TEXT DEFAULT 'member' NOT NULL,
    guild_note TEXT,
    total_deaths NUMERIC,
    current_level_deaths NUMERIC,
    current_gold NUMERIC,
    character_name VARCHAR(255) NOT NULL,
    character_class VARCHAR(255),
    character_level INT,
    character_faction VARCHAR(255),
    character_race VARCHAR(255),
    character_gender VARCHAR(255),
    character_avatar TEXT,
    average_item_level INT,
    equipped_item_level INT,
    active_title VARCHAR(255),
    active_spec VARCHAR(255),
    achievement_points INT,
    raid_profile TEXT,
    mythic_rating DECIMAL,
    mythic_rating_color TEXT,
    realm_id INT NOT NULL,
    realm_name VARCHAR(255),
    realm_slug VARCHAR(255),
    last_login TIMESTAMP,
    is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
    is_main BOOLEAN NOT NULL DEFAULT FALSE,
    last_updated TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX unique_main_character ON characters (user_id) WHERE is_main IS TRUE;

CREATE TABLE IF NOT EXISTS "mounts" (
    mount_id INT PRIMARY KEY,
    mount_name VARCHAR(255) NOT NULL,
    mount_description TEXT,
    mount_source TEXT,
    mount_faction TEXT,
    image_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "keystone_leaderboard" (
    leaderboard_id VARCHAR(255) PRIMARY KEY,
    dungeon_id INT REFERENCES dungeons(dungeon_id) ON DELETE CASCADE,
    current_period_leaderboard INT,
    leading_groups TEXT,
    affixes TEXT,
    connected_realm_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "mythic+_runs" (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    character_id INT REFERENCES characters(character_id) ON DELETE CASCADE,
    dungeon_id INT REFERENCES dungeons(dungeon_id) ON DELETE CASCADE,
    mythic_plus_season INT,
    period INT,
    completed_in_time BOOLEAN,
    total_duration INT,
    time_completed_duration TIMESTAMP,
    keystone_level INT,
    affixes TEXT,
    mythic_rating DECIMAL,
    other_members TEXT,
    realm_id INT,
    connected_realm_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
    OWNER TO postgres;