import ProfileButton from "./ProfileButton";
import WoWCharacters from "./WoWCharacters";

const CurrentProfileData = ({ user, edit, editProfile }) => {
    console.log('user: ', user);
    const { username, email, firstname, lastname, battletag=null, wow_characters} = user;
    return (
        <div>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>First Name: {firstname}</p>
            <p>Last Name: {lastname}</p>
            {battletag && <p>Battle Tag: {battletag}</p>}
            <ProfileButton edit={edit} editProfile={editProfile} />

            <div>
                <WoWCharacters characters={wow_characters} />
            </div>
        </div>
    );
};

export default CurrentProfileData;