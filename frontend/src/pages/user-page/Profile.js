import EditProfile from "./EditProfile";
import { useState } from "react";
import CurrentProfileData from "./CurrentProfileData";
import Api from "../../api";
import BattleNetLink from "./BattleNetLink";

const Profile = ({ user, setUser }) => {
    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState('');

    async function updateUser(user) {
        try {
            const result = await Api.updateUser(user);
            setUser(result);
            setMessage('Profile Updated Successfully!');
            setTimeout(() => {
                setMessage('');
            }, 3000);
            return result;
        } catch (err) {
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

            <div className="profile-link-battlenet">
                {user.battletag ? (
                        <BattleNetLink user={user} />
                    ) : (
                    <div>
                        <p>*To Access more features add a battle tag by clicking Edit Profile</p>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default Profile;
