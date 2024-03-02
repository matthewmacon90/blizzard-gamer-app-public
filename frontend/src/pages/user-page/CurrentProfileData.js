import ProfileButton from "./ProfileButton";

const CurrentProfileData = ({ user, edit, editProfile }) => {
    const { username, email, firstname, lastname, battletag=null} = user;
    return (
        <div>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>First Name: {firstname}</p>
            <p>Last Name: {lastname}</p>
            {battletag && <p>Battle Tag: {battletag}</p>}
            <ProfileButton edit={edit} editProfile={editProfile} />
        </div>
    );
};

export default CurrentProfileData;