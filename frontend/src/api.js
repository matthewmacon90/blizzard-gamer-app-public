import axios from "axios";

const BASE_URL = "http://localhost:3001";

class Api {
    static token = null;

    static async request(endpoint, data = {}, method = "get") {
        try {
            const url = `${BASE_URL}/${endpoint}`;
            const headers = { Authorization: `Bearer ${Api.token}` };
            const params = method === "get" ? data : {};

            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            const message = err.response.data.error;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async verifyToken(storageToken) {
        try {
            this.token = storageToken;
            const headers = { 'authorization': `Bearer ${this.token}` };
            const result = await this.request(`users/verify`, {}, 'get', headers);
            return result;
        } catch (err) {
            throw err;
        }
    };

    static async refreshToken() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            const result = await this.request(`users/refresh`, {}, 'get', headers);
            this.token = result;
            return result;
        } catch (err) {
            throw err;
        }
    };

    static async registerUser(newUser) {
        try {
            console.log('registerUser', newUser);
            let { username, email, password, firstName, lastName, battleTag } = newUser;
            username = username.trim().toLowerCase();
            email = email.trim().toLowerCase();
            firstName = firstName.trim().toLowerCase();
            lastName = lastName.trim().toLowerCase();
            battleTag = battleTag ? battleTag.trim().toLowerCase() : '';

            await this.request(`register`, { username, email, password, firstName, lastName, battleTag }, 'post');
            return 'You have successfully registered! Please log in to continue.';
        } catch (err) {
            throw err;
        }
    };

    static async loginUser(userInfo) {
        try {
            const { username, password } = userInfo;
            const token = await this.request(`login`, { username, password }, 'post');
            this.token = token;
            return token;
        } catch (err) {
            throw err;
        }
    }

    static async updateUser(user) {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            let { username, email, firstName, lastName, battleTag } = user;
            username = username.trim().toLowerCase();
            email = email.trim().toLowerCase();
            firstName = firstName.trim().toLowerCase();
            lastName = lastName.trim().toLowerCase();
            battleTag = battleTag.trim().toLowerCase();

            const result = await this.request(`users/profile/update/`, { username, email, firstName, lastName, battleTag }, 'patch', headers);
            const profile = {
                username: result.username,
                email: result.email,
                firstName: result.firstName,
                lastName: result.lastName,
                battleTag: result.battleTag,
                btoken :  result.btoken ? true : false,
                bTokenExpires: result.btokenExpires
            };
            return profile;
        } catch (err) {
            throw err;
        }
    }

    static async deleteUser() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            await this.request(`users/delete`, {}, 'delete', headers);
        } catch (err) {
            throw err;
        }
    };

    static async getMyProfile() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            const result = await this.request(`users/profile`, {}, 'get', headers);
            console.log('getMyProfile', result)
            const profile = {
                username: result.username,
                email: result.email,
                firstName: result.firstName,
                lastName: result.lastName,
                battleTag: result.battleTag,
                btoken :  result.btoken ? true : false,
                bTokenExpires: result.btokenExpires
            };
            return profile;
        } catch (err) {
            throw err;
        }
    }
    //***************************WoW Profile Section of the API***************************
    static async getWoWProfile() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            const result = await this.request(`my-wow`, {}, 'get', headers);
            return result;
        } catch (err) {
            return err;
        }
    }

    static async getBattleNetToken() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            const result = await this.request(`battlenet/callback`, {}, 'get', headers);
            return result;
        } catch (err) {
            throw err;
        }
    };

    static async getWoWCharacterData(characterId) {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            const result = await this.request(`my-wow/char`, {characterId}, 'get', headers);
            console.log('getWoWCharacterData', result);
            return result;
        } catch (err) {
            throw err;
        }
    }

    //***************************Guild Section of the API***************************
    static async getGuilds(realmSlug) {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            const result = await this.request(`guilds`, { realmSlug }, 'get', headers);
            return result;
        } catch (err) {
            throw err;
        }
    }

        //***************************Mounts Section of the API***************************
    static async getMounts() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            const result = await this.request(`mounts`, {}, 'get', headers);
            return result;
        } catch (err) {
            throw err;
        }
    };

    static async getMountData(mountId) {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            const result = await this.request(`mounts/${mountId}`, {}, 'get', headers);
            return result;
        } catch (err) {
            throw err;
        }
    }

            //***************************Dungeons Section of the API***************************

    static async getDungeons() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            const result = await this.request(`dungeons`, {}, 'get', headers);
            return result;
        } catch (err) {
            console.log('getDungeons', err);
        }
    }
    static async getDungeonByRealmId(realmId) {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            const result = await this.request(`dungeons/${realmId}`, {}, 'get', headers);
            return result;
        } catch (err) {
            console.log('getDungeonByRealmId', err);
        }
    }
                //***************************Realms Section of the API***************************
    static async getRealms() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}` };
            const result = await this.request(`realms`, {}, 'get', headers);
            return result;
        } catch (err) {
            console.log('getRealms', err);
        }
    }
}

export default Api;