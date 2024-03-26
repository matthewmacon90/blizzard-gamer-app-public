import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import logout from "../../helpers/logout";
import './NavbarStyles.css';

const NavBar = () => {
  const auth = useContext(AuthContext);
  const currentUser = auth.currentUser;

  return (
    <nav className="navbar-container">
      <Link to="/" className="nav-link-styles" aria-label="Home Page">Home</Link>
      <Link to="/guilds" className="nav-link-styles" aria-label="Guilds Page">Guilds</Link>
      <Link to="/mounts" className="nav-link-styles" aria-label="Mounts Page">Mounts</Link>
      <Link to="/dungeons" className="nav-link-styles" aria-label="Mythic+ Leaderboard">Mythic+ Leaderboard</Link>
      { currentUser ? (
          <>
            <button className="nav-button-styles" onClick={() => logout(auth.setCurrentUser)} aria-label="Logout">Logout</button>
            <Link to="/my-profile" className="nav-link-styles" aria-label="My Profile">My Profile</Link>
          </>

        ) : (
            <>
              <Link to="/register" className="nav-link-styles" aria-label="Register">Register</Link>
              <Link to="/login" className="nav-link-styles" aria-label="Login">Login</Link>
            </>
        )
      }
    </nav>
  );
};

export default NavBar;
