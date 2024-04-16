import {useState, useEffect, useContext } from 'react';
import Api from '../../../api';
import AuthContext from '../../../context/authContext';
import WoWUserContext from '../../../context/wowContext';
import WoWCharacters from '../wow-components/characters-components/WoWChacters';

const WoWProfile = () => {
    // TODO: When user refreshed page it redirects to login/profile page. User should remain on the same page.
    const auth = useContext(AuthContext);
    const [wowProfile, setWoWProfile] = useState(null);
    console.log('wowProfile', wowProfile);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await Api.getWoWProfile();
                console.log('result', result);
                setWoWProfile(result);
            } catch (err) {
                console.log('fetchWoWProfile', err);
            }
        }
        fetchData();
    }, [auth.currentUser]);

    return (
        <div className="wow-profile-container">
            <WoWUserContext.Provider value={{wowProfile, setWoWProfile}}>
                <h1>WoW Profile</h1>
                <WoWCharacters />
            </WoWUserContext.Provider>
        </div>

    );
};

export default WoWProfile;