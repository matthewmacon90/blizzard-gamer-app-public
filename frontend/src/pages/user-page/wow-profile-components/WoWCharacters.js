import Api from "../../../api";

const WoWCharacters = ({ user, setUser }) => {
    const { wow_characters: characters } = user;
    async function fetchData() {
        const wowProfile = await Api.getWoWProfile();
        const userProfile = { ...user, wow_characters: wowProfile };
        return setUser(userProfile);
    };

    return (
        <div className="wow-character-container">
            <button onClick={fetchData}>Sync WoW Profile</button>
            <h2>WoW Characters</h2>
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
