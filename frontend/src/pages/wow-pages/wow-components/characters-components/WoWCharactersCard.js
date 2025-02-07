import { useContext, useEffect, useState } from 'react';
import WoWUserContext from '../../../../context/wowContext';
import './WoWCharacterStyles.css';
import sonsAvatar from '../../../../pictures/sons-picture.png'
import Api from '../../../../api';

const WoWCharactersCard = () => {
    const {wowCharacters} = useContext(WoWUserContext);

    const updateCharacter = async (characterId) => {
        try {
            await Api.getWoWCharacterData(characterId);
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
                            <img className='wow-character-avatar' src={character.characterAvatar ? character.characterAvatar : sonsAvatar} alt="Character Avatar" />
                        </div>
                        <div className='wow-character-card-right'>
                            <p>Raider IO: {character.mythicRating ? character.mythicRating : `N/A`}</p>
                            <p>Raid Progress: N/A</p>
                            <p>iLevel: {character.equippedItemLevel ? character.equippedItemLevel : `N/A`}</p>
                            <p>Guild:</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WoWCharactersCard;
