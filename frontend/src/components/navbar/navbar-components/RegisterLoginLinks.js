import { Link } from "react-router-dom";

const RegisterLoginLinks = () => {
    return (
        <>
            <li>
              <Link className="nav-link-styles" to="/register" aria-label="Register">Register</Link>
            </li>
            <li>
                <Link className="nav-link-styles" to="/login" aria-label="Login">Login</Link>
            </li>
        </>
    )
};

export default RegisterLoginLinks;