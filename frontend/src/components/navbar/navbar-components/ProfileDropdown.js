import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import logout from "../../../utility/logout";

const ProfileDropdown = () => {
    const auth = useContext(AuthContext);
    return (
        <ul className="profile-dropdown-list">
            <li>
                <Link to="/my-profile" className="nav-link-styles" aria-label="My Profile">My Profile</Link>
            </li>
            <li>
                <button className="nav-button-styles" onClick={() => logout(auth.setCurrentUser)} aria-label="Logout">Logout</button>
            </li>
        </ul>
    )
};

export default ProfileDropdown;