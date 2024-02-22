import RegisterForm from "./RegisterForm";
import {useState, useEffect } from "react";
import Api from "../../api";

const Register = () => {
    const [newUser, setNewUser] = useState({});
    console.log('New User: ', newUser); 

    //Test this without async/await function.
    useEffect(() => {
        async function register() {
            await Api.registerUser(newUser);
        };
        register();
    }, [newUser]);

    const submitUserInfo = (userInfo) => {
        console.log('User Info: ', userInfo);
        setNewUser(userInfo);
    };
    return (
        <div>
            <h1>Register</h1>
            <RegisterForm submit={submitUserInfo}/>
        </div>
    );
};

export default Register;