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
            console.log('HEADERS: ', headers);
            const result = await this.request(`users/verify`, {}, 'get', headers);
            return result;
        } catch (err) {
            console.error('ERROR VERIFYING TOKEN: ', err);
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
            console.error('ERROR REFRESHING TOKEN: ', err);
            throw err;
        }
    };
}

export default Api;