import LoginForm from "./LoginForm";
import Api from "../../api";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [error, setError] = useState(null);
    const auth = useContext(AuthContext);

    async function login(userInfo) {
        try {
            const result = await Api.loginUser(userInfo);
            console.log('RESULT LOGIN PAGE', result);
            auth.setCurrentUser(result);
        } catch (err) {
            console.error('ERROR ON LOGIN PAGE', err);
            setError(err[0]);
        }
    };

    return (
        <div>
            {auth.currentUser ? <Navigate to='/my-profile' replace={true}/> : <LoginForm login={login} error={error} setError={setError}/> }
        </div>
    );
};

export default Login;
