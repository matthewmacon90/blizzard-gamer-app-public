import BattleNetLink from "./BattleNetLink";
import WoWCharacters from "./WoWCharacters";

const WoWProfile = ({user, setUser}) => {
    console.log(user);
    return (
        <div>
            {user.battletag && user.btoken ? <WoWCharacters user={user} setUser={setUser}/> : <BattleNetLink />}
        </div>
    );
};

export default WoWProfile;
