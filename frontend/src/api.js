import axios from 'axios';

class Api {
    static async registerUser(newUser) {
        try{
            console.log('New User API: ', newUser);
            const result = await 
            console.log('Result: ', result);
        } catch (err) {
            console.error(err);
        }
    }
}

export default Api;