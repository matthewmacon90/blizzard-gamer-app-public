import { useContext } from 'react';
import WoWUserContext from '../../../../context/wowContext';
import './WoWCharacterStyles.css';

const WoWCharacters = () => {
    const {wowCharacters} = useContext(WoWUserContext);
    return (
        <div className="wow-character-container">
            <h2 className="WoWCharacter-Heading">WoW Characters</h2>
            <div className="WoWCharacterCard-Container">
                {wowCharacters && wowCharacters.map((character, index) =>
                    <div className="wow-charcter" key={index}>
                        <div className="favorite-star-container">
                            <span className="favorite-star">&#9733;</span>
                        </div>
                        <p>Name: {character.characterName}</p>
                        <p>Level: {character.characterLevel}</p>
                        <p>Class: {character.characterClass}</p>
                        <p>Realm: {character.realmName}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WoWCharacters;
