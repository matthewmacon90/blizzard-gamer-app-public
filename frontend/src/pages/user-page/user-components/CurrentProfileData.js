import WoWProfile from "../wow-profile-components/WoWProfile";
import'./CurrentProfileStyles.css';

const CurrentProfileData = ({ user, setUser, edit, editProfile, deleteUser }) => {
    const { username, email, firstname, lastname, battletag = null, wow_characters } = user;
    return (
        <div className="CurrentProfile-Container">
            <div className="CurrentProfileInformation-Container">
                <ul className="CurrentProfile-List">
                    <li>Username: {username}</li>
                    <li>Email: {email}</li>
                    <li>First Name: {firstname}</li>
                    <li>Last Name: {lastname}</li>
                    {battletag && <li>Battle Tag: {battletag}</li>}
                </ul>
            </div>
            <div className="CurrentProfileBtn-Container">
                <button onClick={editProfile}>{edit ? 'Cancel' : 'Edit Profile'}</button>
                <button onClick={deleteUser}>Delete Profile</button>
            </div>

            <div className="CurrentProfileGame-Container">
                <h2>Game Profiles</h2>
            </div>

            <div className="CurrentProfileWoW-Container">
                <WoWProfile user={user} setUser={setUser} characters={wow_characters} />
            </div>
        </div>
    );
};

export default CurrentProfileData;