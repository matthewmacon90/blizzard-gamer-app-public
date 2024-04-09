import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import CurrentProfileData from "./CurrentProfileData";
import EditProfile from "./EditProfile";
import Api from "../../../api";
import AuthContext from "../../../context/authContext";
import UserContext from "../../../context/userContext";
import './ProfileStyles.css'

const Profile = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const {user, setUser} = useContext(UserContext);
    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState('');

    async function updateUser(user) {
        try {
            const result = await Api.updateUser(user);
            if (!result.btoken) {
                return setUser(result);
            }

            const wowProfile = await Api.getWoWProfile();
            const userProfile = { ...result, wowCharacters: wowProfile };
            setUser(userProfile);
            setMessage('Profile Updated Successfully!');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (err) {
            setMessage(err);
        }
    };

    async function deleteUser() {
        try {
            await Api.deleteUser();
            setUser(null);
            sessionStorage.clear();
            auth.setCurrentUser(null);
            navigate("/", { replace: true });
        } catch (err) {
        }
    }

    const editProfile = () => {
        setEdit(!edit);
        setMessage('');
    };

    return (
        <div className="Profile-Container">
            <h2>Profile Information</h2>
            {edit ? (<EditProfile user={user} edit={edit} editProfile={editProfile} updateUser={updateUser} />) :
                (<CurrentProfileData edit={edit} editProfile={editProfile} deleteUser={deleteUser} />)}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;
