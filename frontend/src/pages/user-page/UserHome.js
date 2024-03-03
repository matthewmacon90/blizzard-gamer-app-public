import {useState, useEffect} from 'react';
import Api from '../../api';
import Profile from './Profile';

const UserHome = () => {
    const [user, setUser] = useState(null);
    console.log('user: ', user);

    useEffect(() => {
        async function fetchData() {
            try{
                const result = await Api.getMyProfile();

                if(!result.btoken) return setUser(result);
                const wowProfile = await Api.getWoWProfile();
                console.log('WOW PROFILE: ', wowProfile);
                const userProfile = {...result, wow_characters: wowProfile};
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