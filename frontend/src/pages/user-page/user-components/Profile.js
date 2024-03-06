import EditProfile from "./EditProfile";
import { useState } from "react";
import CurrentProfileData from "./CurrentProfileData";
import Api from "../../../api";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../../../context/authContext";
import './ProfileStyles.css'

const Profile = ({ user, setUser }) => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
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
            console.error('ERROR DELETING USER: ', err);
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
                (<CurrentProfileData user={user} setUser={setUser} edit={edit} editProfile={editProfile} deleteUser={deleteUser} />)}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;
