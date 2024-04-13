import { Link } from "react-router-dom";
import logout from "../../../utility/logout";

const ProfileDropdown = ({setCurrentUser}) => {
    return (
        <ul className="profile-dropdown-list">
            <li>
                <Link to="/my-profile" className="nav-link-styles profile-btn" aria-label="My Profile">My Profile</Link>
            </li>
            <li>
                <button className="nav-button-styles" onClick={() => logout(setCurrentUser)} aria-label="Logout">Logout</button>
            </li>
        </ul>
    )
};

export default ProfileDropdown;