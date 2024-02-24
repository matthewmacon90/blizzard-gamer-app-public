import RegisterForm from "./RegisterForm";
import Api from "../../api";
import {Link} from "react-router-dom";
import {useState} from "react";

const Register = () => {
    const [message, setMessage] = useState('');

    async function register(userInfo) {
        try {
            const result = await Api.registerUser(userInfo);
            setMessage(result);
        } catch (err) {
            setMessage(err[0]);
        }
    };

    const submitUserInfo = (userInfo) => {
        register(userInfo);
    };

    return (
        <div>
            <h1>Register</h1>
            <RegisterForm submit={submitUserInfo}/>
            {   message &&
                <div className="register-message-container"> 
                    <p>{message}</p>
                </div>
            }
            <div className="register-login-container">
                <p>Already have an account? <Link to="/login" aria-label="Login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;