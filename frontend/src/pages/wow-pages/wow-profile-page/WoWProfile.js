import {useState, useEffect} from 'react';
import useUser from '../../../hooks/useUser';
import WoWUserContext from '../../../context/wowContext';
import WoWCharacters from '../wow-components/characters-components/WoWChacters';

const WoWProfile = () => {
    const { user } = useUser();
    const [wowCharacters, setWowCharacters] = useState(null);
    console.log('WoWProfile user: ', user);
    console.log('wowCharacters: ', wowCharacters);

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