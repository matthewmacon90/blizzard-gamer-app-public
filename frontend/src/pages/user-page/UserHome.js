import {useState, useEffect} from 'react';
import Api from '../../api';
import Profile from './Profile';

const UserHome = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try{
                const result = await Api.getMyProfile();
                setUser(result);
            } catch (err) {
                throw err;
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