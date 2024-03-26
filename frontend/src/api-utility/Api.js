//I will be using this later. 



//Not currently in use.

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
            const headers = { 'authorization': `Bearer ${this.token}`};
            const result = await this.request(`users/verify`, {}, 'get', headers);
            return result;
        } catch (err) {
            throw err;
        }
    };

    static async refreshToken() {
        try {
            const token = this.token;
            const headers = { 'authorization': `Bearer ${token}`};
            const result = await this.request(`users/refresh`, {}, 'get', headers);
            this.token = result;
            return result;
        } catch (err) {
            throw err;
        }
    };
}

export default Api;