import {useEffect} from 'react';
import Api from '../../api';


const UserHome = () => {
    useEffect(() => {
        async function fetchData() {
            try{
                const result = await Api.getMyProfile();
                console.log('result: ', result);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    });

    return (
        <div>
            <h1>Welcome to the User Profile Page</h1>
        </div>
    );
};

export default UserHome;