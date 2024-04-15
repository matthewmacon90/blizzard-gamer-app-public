import { useContext } from "react";
import AuthContext from "../../context/authContext";
import PublicLinks from "./navbar-components/PublicLinks";
import ProfileLinks from "./navbar-components/ProfileLinks";
import RegisterLoginLinks from "./navbar-components/RegisterLoginLinks";
import './NavbarStyles.css';


const NavBar = () => {
  const auth = useContext(AuthContext);

  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
        <PublicLinks />
        { auth.currentUser ? (
          <ProfileLinks />
        ) : (
          <RegisterLoginLinks />
        )
      }
      </ul>
    </nav>
  );
};

export default NavBar;
