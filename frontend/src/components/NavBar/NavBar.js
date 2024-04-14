import { useContext } from "react";
import AuthContext from "../../context/authContext";
import PublicLinks from "./navbar-components/PublicLinks";
import ProfileLinks from "./navbar-components/ProfileLinks";
import RegisterLoginLinks from "./navbar-components/RegisterLoginLinks";
import './NavbarStyles.css';


const NavBar = () => {
  const auth = useContext(AuthContext);
  const currentUser = auth.currentUser;
  const setCurrentUser = auth.setCurrentUser;

  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
        <PublicLinks />
        { currentUser ? (
          <ProfileLinks setCurrentUser={setCurrentUser} />
        ) : (
          <RegisterLoginLinks />
        )
      }
      </ul>
    </nav>
  );
};

export default NavBar;
