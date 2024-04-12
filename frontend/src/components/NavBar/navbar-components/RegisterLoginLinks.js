import { Link } from "react-router-dom";

const RegisterLoginLinks = () => {
    return (
        <>
            <li>
              <Link to="/register" aria-label="Register">Register</Link>
            </li>
            <li>
                <Link to="/login" aria-label="Login">Login</Link>
            </li>
        </>
    )
};

export default RegisterLoginLinks;