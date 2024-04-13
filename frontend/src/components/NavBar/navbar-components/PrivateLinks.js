import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";

const PrivateLinks = ({setCurrentUser}) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    console.log('showProfileDropdown', showProfileDropdown);
    
    const handleClick = () => {

    }

    return (
        <div className="private-links-container">
            <button className="nav-button-styles" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>Profile</button>
            {showProfileDropdown && <ProfileDropdown setCurrentUser={setCurrentUser} />}
        </div>
    )
};

export default PrivateLinks;