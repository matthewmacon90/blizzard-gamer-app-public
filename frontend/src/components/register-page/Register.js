import RegisterForm from "./RegisterForm";
import {useState} from "react";
import Api from "../../api";

const Register = () => {
    const initalState = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };

    const [newUser, setNewUser] = useState(initalState);

    //Test this without async/await function.
    async function register() {
        await Api.registerUser(newUser);
    };

    const submitUserInfo = (userInfo) => {
        setNewUser(userInfo);
        register();
    };

    return (
        <div>
            <h1>Register</h1>
            <RegisterForm initalState={initalState} submit={submitUserInfo}/>
        </div>
    );
};

export default Register;