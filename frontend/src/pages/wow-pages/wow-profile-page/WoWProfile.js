import {useState, useEffect, useContext } from 'react';
import Api from '../../../api';
import WoWUserContext from '../../../context/wowContext';

const WoWProfile = () => {
    const [wowProfile, setWoWProfile] = useState(null);
    console.log('wowProfile', wowProfile);
    const WoWUserData = useContext(WoWUserContext);

    useEffect(() => {
        async function fetchWoWProfile() {
            try {
                const result = await Api.getWoWProfile();
                setWoWProfile(result);
            } catch (err) {
            }
        }
        fetchWoWProfile();
    }, []);

    return (
        <WoWUserData.Provider value={{wowProfile, setWoWProfile}}>
            <div className="wow-profile-container">
                <h1>WoW Profile</h1>
            </div>
        </WoWUserData.Provider>
    );
};

export default WoWProfile;