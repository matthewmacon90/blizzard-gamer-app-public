import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/my-profile">My Profile</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default NavBar;