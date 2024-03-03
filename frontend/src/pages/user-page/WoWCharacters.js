const WoWCharacters = ({characters}) => {
    console.log('characters: ', characters);
    return (
        <div className="wow-character-container">
            <p>WoW Characters</p>
            {characters && characters.map((character) => 
                <div className="wow-charcter" key={character.character_id}> 
                    <p>Name: {character.character_name}</p>
                    <p>Level: {character.character_level}</p>
                    <p>Class: {character.character_class}</p>
                    <p>Realm: {character.realm_name}</p>
                </div>
            )}
        </div>
    );
};

export default WoWCharacters;
