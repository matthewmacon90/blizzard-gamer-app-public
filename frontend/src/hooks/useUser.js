import { useState, useEffect, useContext } from 'react';
import Api from '../api';
import AuthContext from '../context/authContext';

const useUser = () => {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await Api.getMyProfile();
                if (!result.btoken) {
                    return setUser(result)
                }

                const wowProfile = await Api.getWoWProfile();

                if (wowProfile[0] === 'Request failed with status code 401') {
                    const refeshData = await Api.refreshToken();
                    console.log('refeshData', refeshData);
                    sessionStorage.clear();
                    sessionStorage.setItem('token', refeshData);
                    auth.setCurrentUser(refeshData);
                    const result = await Api.getMyProfile();
                    const wowProfile = await Api.getWoWProfile();
                    const userProfile = { ...result, wowCharacters: wowProfile };
                    return setUser(userProfile);
                }
                const userProfile = { ...result, wowCharacters: wowProfile };
                setUser(userProfile);
            } catch (err) {
            }
        }
        fetchData();
    }, [loading]);

    return {user, setUser, setLoading};
};

export default useUser;