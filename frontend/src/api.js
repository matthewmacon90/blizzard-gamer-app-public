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
            console.log('New User: ', newUser);
            let {username, email, password, firstName, lastName} = newUser;
            username = username.trim().toLowerCase();
            email = email.trim().toLowerCase();
            firstName = firstName.trim().toLowerCase();
            lastName = lastName.trim().toLowerCase();
            const result = await this.request(`register`, {username, email, password, firstName, lastName}, 'post');
            console.log('Result: ', result);
        } catch (err) {
            console.error('ERROR AFTER THE CALL: ', err);
        }
    };
}

export default Api;