import {useState, useEffect} from 'react';
import useUser from '../../../hooks/useUser';
import WoWUserContext from '../../../context/wowContext';
import WoWCharactersCard from '../wow-components/characters-components/WoWCharactersCard';

const WoWProfile = () => {
    const { user } = useUser();
    const [wowCharacters, setWowCharacters] = useState(null);

    useEffect(() => {
        const wowCharacters = user?.wowCharacters || JSON.parse(sessionStorage.getItem('wowCharacters'));
        setWowCharacters(wowCharacters);
    }, []);

    return (
        <div className="wow-profile-container">
            <WoWUserContext.Provider value={{wowCharacters, setWowCharacters}}>
                <h1>WoW Profile</h1>
                <div className='wow-profile-character-container'>
                    <WoWCharactersCard />
                </div>
            </WoWUserContext.Provider>
        </div>
    );
};

export default WoWProfile;