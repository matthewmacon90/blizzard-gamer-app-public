import axios from 'axios';

class Api {
    constructor(API_URL = 'http://localhost:3001/', data=null, METHOD = 'GET') {
        this.API_URL = API_URL;
        this.data = data;
        this.METHOD = METHOD;
    };

    static async registerUser(newUser) {
        try{
            console.log('New User API: ', newUser);
            const result = await axios.register(`${this.API_URL}/register`, newUser, 'POST');
            console.log('Result: ', result);
        } catch (err) {
            console.error(err);
        }
    };
}

export default Api;