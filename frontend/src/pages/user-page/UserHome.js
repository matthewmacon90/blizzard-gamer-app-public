import useUser from '../../hooks/useUser';
import Profile from './user-components/Profile';
import UserContext from '../../context/userContext';
import './UserHomeStyles.css';

const UserHome = () => {
    const { user, setUser } = useUser();
    console.log('UserHome user', user);

    return (
        <div className='UserHome-Container'>
            <UserContext.Provider value={{ user, setUser }}>
                <h1>Welcome to the User Profile Page</h1>
                {user && <Profile />}
            </UserContext.Provider>
        </div>
    );
};

export default UserHome;