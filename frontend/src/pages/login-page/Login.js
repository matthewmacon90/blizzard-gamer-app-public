import LoginForm from "./LoginForm";
import Api from "../../api";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import './LoginStyles.css';

const Login = () => {
    const [error, setError] = useState(null);
    const auth = useContext(AuthContext);

    async function login(userInfo) {
        try {
            const result = await Api.loginUser(userInfo);
            sessionStorage.setItem('token', result);
            auth.setCurrentUser(result);
        } catch (err) {
            setError(err[0]);
        }
    };

    return (
        <div className="Login-Container">
            {auth.currentUser ? <Navigate to='/my-profile' replace={true}/> : <LoginForm login={login} error={error} setError={setError}/> }
        </div>
    );
};

export default Login;
