import { useContext } from 'react';
import WoWUserContext from '../../../../context/wowContext';
import './WoWCharacterStyles.css';
import Api from '../../../../api';

const WoWCharacters = () => {
    const {wowCharacters} = useContext(WoWUserContext);
    const updateCharacter = async (characterId) => {
        try {
            console.log('updateCharacter CHARACTER ID: ', characterId);
            const result = await Api.getWoWCharacterData(characterId);
            console.log('UPDATE CHARACTER: ', result);
        } catch (error) {
            console.log('ERROR UPDATING CHARACTER: ', error);
        }
    };

    return (
        <div className="wow-character-container">
            <h2 className="WoWCharacter-Heading">WoW Characters</h2>
            <div className="WoWCharacterCard-Container">
                {wowCharacters && wowCharacters.map((character) =>
                    <div onClick={() => updateCharacter(character.characterId)} className="wow-character-card" key={character.characterId}>
                        {/* <div className="favorite-star-container">
                            <span className="favorite-star">&#9733;</span>
                        </div> */}
                        <div className='wow-character-card-left'>
                            <p>Name: {character.characterName}</p>
                            <p>Level: {character.characterLevel}</p>
                            <p>Class: {character.characterClass}</p>
                            <p>Realm: {character.realmName}</p>
                        </div>
                        <div className='wow-character-card-middle'>
                            <h3>Character Avatar</h3>
                        </div>
                        <div className='wow-character-card-right'>
                            <p>Raider IO: {character['mythic+Rating'] ? character['mythic+Rating'] : `N/A`}</p>
                            <p>Raid Progress:</p>
                            <p>iLevel: {character.equippedItemLevel ? character.equippedItemLevel : `N/A`}</p>
                            <p>Guild:</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WoWCharacters;
