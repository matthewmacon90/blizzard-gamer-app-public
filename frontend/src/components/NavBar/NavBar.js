import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import logout from "../../helpers/logout";

const NavBar = () => {
  const auth = useContext(AuthContext);
  const currentUser = auth.currentUser;

  return (
    <nav>
      <button><Link to="/">Home</Link></button>
      { currentUser ? (
          <>
            <button onClick={() => logout(auth.setCurrentUser)}>Logout</button>
            <button><Link to="/my-profile">My Profile</Link></button>
          </>

        ) : (
            <>
              <button><Link to="/register">Register</Link></button>
              <button><Link to="/login">Login</Link></button>
            </>
        )
      }
    </nav>
  );
};

export default NavBar;