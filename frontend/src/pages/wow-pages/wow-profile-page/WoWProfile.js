import {useState, useEffect, useContext, useCallback } from 'react';
import useUser from '../../../hooks/useUser';
import AuthContext from '../../../context/authContext';
import WoWUserContext from '../../../context/wowContext';
import WoWCharacters from '../wow-components/characters-components/WoWChacters';

const WoWProfile = () => {
    // TODO: When user refreshed page it redirects to login/profile page. User should remain on the same page.
    // const auth = useContext(AuthContext);
    const { user, setIsCurrent } = useUser();
    console.log('user', user,);


    // useEffect(() => {
    //     setIsCurrent(true);
    //     setWowCharacters(user?.wowCharacters);
    // }, [user]);

    return (
        <div className="wow-profile-container">
            <WoWUserContext.Provider value={{user, setIsCurrent}}>
                <h1>WoW Profile</h1>
                <WoWCharacters />
            </WoWUserContext.Provider>
        </div>
    );
};

export default WoWProfile;