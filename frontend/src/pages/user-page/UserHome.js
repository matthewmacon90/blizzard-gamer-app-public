import { useState, useEffect, useContext } from 'react';
import Api from '../../api';
import Profile from './user-components/Profile';
import AuthContext from '../../context/authContext';

const UserHome = () => {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState(null);
    console.log('USER: ', user);

    //The user page is rendering 3 times. This is something that needs to be fixed.

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await Api.getMyProfile();
                if (!result.btoken) return setUser(result);

                const refeshData = await Api.refreshToken();
                sessionStorage.clear();
                sessionStorage.setItem('token', refeshData);
                auth.setCurrentUser(refeshData);

                const wowProfile = await Api.getWoWProfile();
                const userProfile = { ...result, wow_characters: wowProfile };
                setUser(userProfile);
            } catch (err) {
                console.log('ERROR FETCHING USER PROFILE: ', err);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Welcome to the User Profile Page</h1>
            {user && <Profile user={user} setUser={setUser} />}
        </div>
    );
};

export default UserHome;