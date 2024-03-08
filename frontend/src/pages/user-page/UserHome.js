import { useState, useEffect, useContext } from 'react';
import Api from '../../api';
import Profile from './user-components/Profile';
import AuthContext from '../../context/authContext';
import './UserHomeStyles.css';

const UserHome = () => {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    console.log('USER: ', user);

    //The user page is rendering 3 times. This is something that needs to be fixed.

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await Api.getMyProfile();
                console.log('RESULT: ', result);
                if (!result.btoken) {
                    return setUser(result)
                }

                const refeshData = await Api.refreshToken();
                console.log('REFRESH DATA: ', refeshData);
                sessionStorage.clear();
                sessionStorage.setItem('token', refeshData);
                auth.setCurrentUser(refeshData);

                const wowProfile = await Api.getWoWProfile();
                console.log('WOW PROFILE: ', wowProfile);

                if(wowProfile[0] === 'Request failed with status code 404') {
                    setMessage('No characters found.');
                    return setUser(result);
                }

                const userProfile = { ...result, wowCharacters: wowProfile };
                setUser(userProfile);
            } catch (err) {
                console.log('ERROR FETCHING USER PROFILE: ', err);
            }
        }
        fetchData();
    }, []);


    return (
        <div className='UserHome-Container'>
            <h1>Welcome to the User Profile Page</h1>
            {user && <Profile user={user} setUser={setUser} />}
        </div>
    );
};

export default UserHome;