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
    role TEXT NOT NULL DEFAULT 'standard user',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

ALTER TABLE users
    OWNER TO postgres;