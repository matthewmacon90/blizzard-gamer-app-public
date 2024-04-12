import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const PrivateLinks = ({setCurrentUser}) => {
    return (
        <div className="private-links-container">
            <Link to="/my-profile" className="nav-link-styles" aria-label="My Profile">My Profile</Link>
            <ProfileDropdown setCurrentUser={setCurrentUser} />
        </div>
    )
};

export default PrivateLinks;