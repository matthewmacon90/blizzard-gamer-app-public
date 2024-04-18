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
                // console.log('result', result);
                if (!result.btoken) {
                    return setUser(result)
                }

                // const refeshData = await Api.refreshToken();
                // console.log('refeshData', refeshData);
                // sessionStorage.clear();
                // sessionStorage.setItem('token', refeshData);
                // auth.setCurrentUser(refeshData);
                const wowProfile = await Api.getWoWProfile();
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