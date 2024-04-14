import { useState, useRef, useEffect } from "react";
import ProfileDropdown from "./ProfileDropdown";

const ProfileLinks = ({setCurrentUser}) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const profileDropdownRef = useRef(null);
    const profileBtnClass =  showProfileDropdown ? `nav-button-styles profile-btn` : `nav-button-styles`;

    useEffect(() => {
       const handleClick = (e) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
                setShowProfileDropdown(false);
            }
       };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        <>
            <li>
                <div className="profile-links-container" ref={profileDropdownRef}>
                    <button className={profileBtnClass} onClick={() => setShowProfileDropdown(!showProfileDropdown)}>Profile</button>
                    {showProfileDropdown && <ProfileDropdown setCurrentUser={setCurrentUser} />}
                </div>
            </li>
        </>
    )
};

export default ProfileLinks;