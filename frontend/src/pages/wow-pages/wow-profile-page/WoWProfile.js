import {useState, useEffect, useContext } from 'react';
import Api from '../../../api';
import WoWUserContext from '../../../context/wowContext';

const WoWProfile = () => {
    const [wowProfile, setWoWProfile] = useState(null);
    console.log('wowProfile', wowProfile);

    useEffect(() => {
        async function fetchWoWProfile() {
            try {
                const result = await Api.getWoWProfile();
                console.log('result', result);
                setWoWProfile(result);
            } catch (err) {
                console.log('fetchWoWProfile', err);
            }
        }
        fetchWoWProfile();
    }, []);

    return (
        <div className="wow-profile-container">
            <WoWUserContext.Provider value={{wowProfile, setWoWProfile}}>
                <h1>WoW Profile</h1>
            </WoWUserContext.Provider>
        </div>

    );
};

export default WoWProfile;