import LoginForm from "./LoginForm";
import Api from "../../api";

const Login = () => {
    async function login(userInfo) {
        try {
            const result = await Api.loginUser(userInfo);
            console.log('RESULT: ', result);
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
