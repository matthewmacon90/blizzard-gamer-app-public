import LoginForm from "./LoginForm";
import Api from "../../api";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

const Login = () => {
    const auth = useContext(AuthContext);

    async function login(userInfo) {
        try {
            const result = await Api.loginUser(userInfo);
            auth.setCurrentUser(result);
        } catch (err) {
            console.error(err);
        }
    };

    const submitLogin = (data) => {
        login(data);
    };

    return (
        <div>
            <LoginForm submitLogin={submitLogin}/>
        </div>
    );
};

export default Login;
