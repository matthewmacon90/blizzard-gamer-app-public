import axios from "axios";

const BASE_URL = "http://localhost:3001";

class Api {
    static token = null;

    static async request(endpoint, data = {}, method = "get") {
        try {
            console.debug("API Call:", endpoint, data, method);

            const url = `${BASE_URL}/${endpoint}`;
            const headers = { Authorization: `Bearer ${Api.token}` };
            const params = method === "get" ? data : {};

            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            console.error('ERROR: ', err);
            const message = err.response.data.error;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async verifyToken(storageToken) {
        try {
            this.token = storageToken;
            const headers = { 'authorization': `Bearer ${this.token}`};
            const result = await this.request(`users/verify`, {}, 'get', headers);
            return result;
        } catch (err) {
            console.error('ERROR VERIFYING TOKEN: ', err);
            throw err;
        }
    };

    static async registerUser(newUser) {
        try{
            let {username, email, password, firstName, lastName, battletag} = newUser;
            username = username.trim().toLowerCase();
            email = email.trim().toLowerCase();
            firstName = firstName.trim().toLowerCase();
            lastName = lastName.trim().toLowerCase();
            battletag = battletag.trim().toLowerCase();

            await this.request(`register`, {username, email, password, firstName, lastName, battletag}, 'post');
            return 'You have successfully registered! Please log in to continue.';
        } catch (err) {
            console.error('ERROR REGISTER API: ', err);
            throw err;
        }
    };

    static async loginUser(userInfo) {
        try {
            const {username, password} = userInfo;
            const token = await this.request(`login`, {username, password}, 'post');
            this.token = token;
            return token;
        } catch (err) {
            console.log('ERROR: ', err);
            throw err;
        }
    }

    static async updateUser(user) {
        try {
            console.log('USER: ', user);
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}`};
            let {username, email, firstname, lastname, battletag} = user;
            username = username.trim().toLowerCase();
            email = email.trim().toLowerCase();
            firstname = firstname.trim().toLowerCase();
            lastname = lastname.trim().toLowerCase();
            battletag = battletag.trim().toLowerCase();

            const result = await this.request(`users/profile/update/`, {username, email, firstname, lastname, battletag}, 'patch', headers);

            return result;
        } catch (err) {
            throw err;
        }
    }

    static async getMyProfile() {
        try{
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}`};
            const result = await this.request(`users/profile`, {}, 'get', headers);
            return result;
        } catch (err) {
            return err;
        }
    }

    static async getBattleNetToken() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}`};
            const result = await this.request(`battlenet/callback`, {}, 'get', headers);
            return result;
        } catch (err) {
            console.error('ERROR GETTING BATTLENET TOKEN: ', err);
            throw err;
        }
    };
}

export default Api;