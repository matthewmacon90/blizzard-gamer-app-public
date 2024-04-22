import { useState, useEffect, useContext } from 'react';
import { checkTokenDate } from '../utility/checkTokenDate';
import Api from '../api';
import AuthContext from '../context/authContext';

const useUser = () => {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await Api.getMyProfile();
                if (!result.btoken) {
                    return setUser(result)
                }

                if(result.bTokenExpires) {
                    const isExpired = checkTokenDate(result.bTokenExpires);
                    if(isExpired) {
                        window.location.href = 'http://localhost:3001/battlenet';
                        const refeshData = await Api.refreshToken();
                        sessionStorage.clear();
                        sessionStorage.setItem('token', refeshData);
                        auth.setCurrentUser(refeshData);
                        const result = await Api.getMyProfile();
                        const wowProfile = await Api.getWoWProfile();
                        sessionStorage.setItem('wowCharacters', JSON.stringify(wowProfile));
                        const userProfile = { ...result, wowCharacters: wowProfile };
                        return setUser(userProfile);
                    }
                }
                const wowProfile = await Api.getWoWProfile();

                if (wowProfile[0] === 'Request failed with status code 401') {
                    console.log('WOW PROFILE 401: ')
                    const refeshData = await Api.refreshToken();
                    sessionStorage.clear();
                    sessionStorage.setItem('token', refeshData);
                    auth.setCurrentUser(refeshData);
                    const result = await Api.getMyProfile();
                    const wowProfile = await Api.getWoWProfile();
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