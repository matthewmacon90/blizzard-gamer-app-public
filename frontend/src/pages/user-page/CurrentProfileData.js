import ProfileButton from "./ProfileButton";

const CurrentProfileData = ({ user, edit, editProfile }) => {
    const { username, email, firstname, lastname } = user;
    return (
        <div>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>First Name: {firstname}</p>
            <p>Last Name: {lastname}</p>
            <ProfileButton edit={edit} editProfile={editProfile} />
        </div>
    );
};

export default CurrentProfileData;