//I will be using this later. 



//Not currently in use.

import Api from './Api.js';

class UserApi extends Api {
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
            throw err;
        }
    }

    static async updateUser(user) {
        try {
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

    static async deleteUser() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}`};
            await this.request(`users/delete`, {}, 'delete', headers);
        } catch (err) {
            throw err;
        }
    };

    static async getMyProfile() {
        try{
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}`};
            const result = await this.request(`users/profile`, {}, 'get', headers);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async getWoWProfile() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}`};
            const result = await this.request(`my-wow`, {}, 'get', headers);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async getBattleNetToken() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}`};
            const result = await this.request(`battlenet/callback`, {}, 'get', headers);
            return result;
        } catch (err) {
            throw err;
        }
    };
}

export default UserApi;