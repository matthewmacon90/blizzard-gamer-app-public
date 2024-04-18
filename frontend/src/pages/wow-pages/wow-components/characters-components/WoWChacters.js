import { useContext } from 'react';
import WoWUserContext from '../../../../context/wowContext';
import './WoWCharacterStyles.css';

const WoWCharacters = () => {
    const {user} = useContext(WoWUserContext);
    return (
        <div className="wow-character-container">
            <h2 className="WoWCharacter-Heading">WoW Characters</h2>
            <div className="WoWCharacterCard-Container">
                {user && user.wowCharacters.map((character, index) =>
                    <div className="wow-charcter" key={index}>
                        <div className="favorite-star-container">
                            <span className="favorite-star">&#9733;</span>
                        </div>
                        <p>Name: {character.character_name}</p>
                        <p>Level: {character.character_level}</p>
                        <p>Class: {character.character_class}</p>
                        <p>Realm: {character.realm_name}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WoWCharacters;
