import { useState, useEffect, useContext } from 'react';
import Api from '../api';
import AuthContext from '../context/authContext';

const useUser = () => {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await Api.getMyProfile();
                console.log('useUser result', result)
                if (!result.btoken) {
                    console.log('useUser result', result)
                    return setUser(result)
                }

                const wowProfile = await Api.getWoWProfile();
                console.log('useUser wowProfile', wowProfile);

                if (wowProfile[0] === 'Request failed with status code 401') {
                    const refeshData = await Api.refreshToken();
                    console.log('refeshData', refeshData);
                    sessionStorage.clear();
                    sessionStorage.setItem('token', refeshData);
                    auth.setCurrentUser(refeshData);
                    const result = await Api.getMyProfile();
                    const wowProfile = await Api.getWoWProfile();
                    console.log('useUser wowProfile', wowProfile);
                    sessionStorage.setItem('wowCharacters', JSON.stringify(wowProfile));
                    const userProfile = { ...result, wowCharacters: wowProfile };
                    return setUser(userProfile);
                }
                sessionStorage.setItem('wowCharacters', JSON.stringify(wowProfile));
                const userProfile = { ...result, wowCharacters: wowProfile };

                setUser(userProfile);
            } catch (err) {
            }
        }
        fetchData();
    }, []);

    return {user, setUser};
};

export default useUser;