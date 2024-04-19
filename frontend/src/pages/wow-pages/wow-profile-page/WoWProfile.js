import {useState, useEffect, useContext, useCallback } from 'react';
import useUser from '../../../hooks/useUser';
import AuthContext from '../../../context/authContext';
import WoWUserContext from '../../../context/wowContext';
import WoWCharacters from '../wow-components/characters-components/WoWChacters';

const WoWProfile = () => {
    // TODO: When user refreshed page it redirects to login/profile page. User should remain on the same page.
    // const auth = useContext(AuthContext);
    const { user } = useUser();
    const [wowCharacters, setWowCharacters] = useState(null);
    console.log('WoWProfile wowCharacters', wowCharacters);
    console.log('user', user);


    useEffect(() => {
        const wowCharacters = user?.wowCharacters || JSON.parse(sessionStorage.getItem('wowCharacters'));
        setWowCharacters(wowCharacters);
    }, []);

    return (
        <div className="wow-profile-container">
            <WoWUserContext.Provider value={{wowCharacters, setWowCharacters}}>
                <h1>WoW Profile</h1>
                <WoWCharacters />
            </WoWUserContext.Provider>
        </div>
    );
};

export default WoWProfile;