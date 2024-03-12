import Api from "../../../api";
import BattleNetLink from "./BattleNetLink";
import './WoWCharacterStyles.css';


const WoWCharacters = ({isExpired, user, setUser }) => {
    const {btoken, wowCharacters: characters } = user;

    async function fetchData() {
        const wowProfile = await Api.getWoWProfile();
        if(wowProfile[0] === 'Request failed with status code 404') {
            return setUser(user);
        }

        const userProfile = { ...user, wowCharacters: wowProfile };
        return setUser(userProfile);
    };

    return (
        <div className="wow-character-container">
            <h2 className="WoWCharacter-Heading">WoW Characters</h2>
            <div className="WoWCharacterBtn-Container">
                {!btoken || isExpired ? <BattleNetLink isExpired={isExpired} /> : <button onClick={fetchData}>Sync WoW Profile</button>}
            </div>
            <div className="WoWCharacterCard-Container">
                {characters && characters.map((character) =>
                    <div className="wow-charcter" key={character.character_id}>
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
