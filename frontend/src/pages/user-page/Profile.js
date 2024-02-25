import EditProfile from "./EditProfile";
import { useState } from "react";
import CurrentProfileData from "./CurrentProfileData";
import ProfileButton from "./ProfileButton";
import Api from "../../api";

const Profile = ({ user, setUser }) => {
    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState('');

    async function updateUser(user) {
        try {
            console.log('updateUser', user);
            const result = await Api.updateUser(user);
            setUser(result);
            setMessage('Profile Updated Successfully!');
            setTimeout(() => {
                setMessage('');
            }, 3000);
            return result;
        } catch (err) {
            console.error(err);
            setMessage(err);
        }
    };

    const editProfile = () => {
        setEdit(!edit);
        setMessage('');
    };

    return (
        <div className="profile-container">
            <h2>Profile Information</h2>
            {edit ? (<EditProfile user={user} edit={edit} editProfile={editProfile} updateUser={updateUser} />) :
                (<CurrentProfileData user={user} edit={edit} editProfile={editProfile} />)}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;
