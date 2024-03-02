import RegisterForm from "./RegisterForm";
import Api from "../../api";
import {Link, Navigate} from "react-router-dom";
import {useState} from "react";

const Register = () => {
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    async function register(userInfo) {
        try {
            const result = await Api.registerUser(userInfo);

            setMessage(result);
            setIsRegistered(!isRegistered);

        } catch (err) {
            setMessage(err[0]);
            setIsRegistered(isRegistered);
            console.log('ERROR ON REGISTER PAGE', err)
        }
    };

    const submitUserInfo = (userInfo) => {
        register(userInfo);
    };

    return (
        <div>
            <h1>Register</h1>
            <RegisterForm submit={submitUserInfo}/>
            {message &&
                <div className="register-message-container"> 
                    <p>{message}</p>
                </div>
            }
            <div className="register-login-container">
                <p>Already have an account? <Link to="/login" aria-label="Login">Login</Link></p>
            </div>
            {isRegistered ? <Navigate to="/login"/> : null}
        </div>
    );
};

export default Register;