import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import Logout from "../../logout/Logout";

const ProfileDropdown = () => {
    const auth = useContext(AuthContext);
    return (
        <ul className="profile-dropdown-list">
            <li>
                <Link to="/my-profile" className="nav-link-styles" aria-label="My Profile">My Profile</Link>
            </li>
            <li>
                <Logout setCurrentUser={auth.setCurrentUser} />
            </li>
        </ul>
    )
};

export default ProfileDropdown;