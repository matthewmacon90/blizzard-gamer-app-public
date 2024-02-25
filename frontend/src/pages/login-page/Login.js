import LoginForm from "./LoginForm";
import Api from "../../api";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import checkResult from "../../helpers/checkResult";

const Login = () => {
    const [error, setError] = useState(null);
    const auth = useContext(AuthContext);

    async function login(userInfo) {
        try {
            const result = await Api.loginUser(userInfo);
            const data = checkResult(result);

            if (!data) {
                setError('Invalid username or password');
                return;
            }
            auth.setCurrentUser(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {auth.currentUser ? <Navigate to='/my-profile' replace={true}/> : <LoginForm login={login} error={error} setError={setError}/> }
        </div>
    );
};

export default Login;
