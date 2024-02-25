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

    static async registerUser(newUser) {
        try{
            let {username, email, password, firstName, lastName} = newUser;
            username = username.trim().toLowerCase();
            email = email.trim().toLowerCase();
            firstName = firstName.trim().toLowerCase();
            lastName = lastName.trim().toLowerCase();
            await this.request(`register`, {username, email, password, firstName, lastName}, 'post');
            return 'You have successfully registered! Please log in to continue.';
        } catch (err) {
            return err;
        }
    };

    static async loginUser(userInfo) {
        try {
            const {username, password} = userInfo;
            const token = await this.request(`login`, {username, password}, 'post');
            this.token = token;
            return token;
        } catch (err) {
            return err;
        }
    }

    static async getMyProfile() {
        try{
            const result = await this.request(`profile`);
            return result;
        } catch (err) {
            return err;
        }
    }

    static async linkBattleNetAccount() {
        try{
            const result = await this.request(`wow-user`);
            console.log('result: ', result);
            return result;
        } catch (err) {
            return err;
        }
    };

    static async getMyWow(){
        try {
            const result = await this.request(`wow-user`);
            console.log('result get my wow: ', result);
            return result
        } catch (err) {
            return err;
        }
    }
}

export default Api;