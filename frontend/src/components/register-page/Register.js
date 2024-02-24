import RegisterForm from "./RegisterForm";
import Api from "../../api";

const Register = () => {
    //Test this without async/await function.
    async function register(userInfo) {
        await Api.registerUser(userInfo);
    };

    const submitUserInfo = (userInfo) => {
        console.log(userInfo);
        register(userInfo);
    };

    return (
        <div>
            <h1>Register</h1>
            <RegisterForm submit={submitUserInfo}/>
        </div>
    );
};

export default Register;