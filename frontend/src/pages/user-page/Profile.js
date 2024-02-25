import EditProfile from "./EditProfile";
import { useState } from "react";
import CurrentProfileData from "./CurrentProfileData";
import ProfileButton from "./ProfileButton";

const Profile = ({user}) => {
    const [edit, setEdit] = useState(false);

    const editProfile = () => {
        setEdit(!edit);
    };

    return (
        <div className="profile-container">
            <h2>Profile Information</h2>
            {edit ? (<EditProfile user={user}/>) : (<CurrentProfileData user={user}/>)}
            <ProfileButton edit={edit} editProfile={editProfile}/>
        </div>
    );
};

export default Profile;
