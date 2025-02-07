import { useContext } from "react";
import WoWProfile from "../wow-profile-components/WoWProfile";
import BattleNetLink from "../wow-profile-components/BattleNetLink";
import UserContext from "../../../context/userContext";
import'./CurrentProfileStyles.css';

const CurrentProfileData = ({edit, editProfile, deleteUser }) => {
    const { user, setUser } = useContext(UserContext);
    const { username, email, firstName, lastName, battleTag = null, wow_characters } = user;
    return (
        <div className="CurrentProfile-Container">
            <div className="CurrentProfileInformation-Container">
                <ul className="CurrentProfile-List">
                    <li>Username: {username}</li>
                    <li>Email: {email}</li>
                    <li>First Name: {firstName}</li>
                    <li>Last Name: {lastName}</li>
                    {battleTag && <li>Battle Tag: {battleTag}</li>}
                </ul>
            </div>
            <div className="CurrentProfileBtn-Container">
                <button onClick={editProfile}>{edit ? 'Cancel' : 'Edit Profile'}</button>
                <button onClick={deleteUser}>Delete Profile</button>
            </div>
            <div className="CurrentProfileGame-Container">
                <h2>Game Profiles</h2>
                <BattleNetLink />
            </div>
        </div>
    );
};

export default CurrentProfileData;