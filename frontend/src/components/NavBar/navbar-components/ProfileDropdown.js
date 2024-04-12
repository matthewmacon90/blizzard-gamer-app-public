import logout from "../../../utility/logout";

const ProfileDropdown = ({setCurrentUser}) => {
 return (
    <ul className="profile-dropdown-list">
        <li>
            <button className="nav-button-styles" onClick={() => logout(setCurrentUser)} aria-label="Logout">Logout</button>
        </li>
    </ul>
 )
};

export default ProfileDropdown;