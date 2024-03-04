import WoWProfile from "../wow-profile-components/WoWProfile";

const CurrentProfileData = ({ user, setUser, edit, editProfile, deleteUser }) => {
    const { username, email, firstname, lastname, battletag = null, wow_characters } = user;
    return (
        <div>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>First Name: {firstname}</p>
            <p>Last Name: {lastname}</p>
            {battletag && <p>Battle Tag: {battletag}</p>}
            <button onClick={editProfile}>{edit ? 'Cancel' : 'Edit Profile'}</button>
            <button onClick={deleteUser}>Delete Profile</button>

            <div>
                <WoWProfile user={user} setUser={setUser} characters={wow_characters} />
            </div>
        </div>
    );
};

export default CurrentProfileData;