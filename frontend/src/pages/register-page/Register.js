import RegisterForm from "./RegisterForm";
import Api from "../../api";
import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import BattleNetAuth from "./BattleNetAuth"; //Implement this later when user has logged in and they can connect their battlenet account to their user account.
import checkResult from "../../helpers/checkResult";

const Register = () => {
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    async function register(userInfo) {
        try {
            const result = await Api.registerUser(userInfo);
            const data = checkResult(result);
            
            if (!data) {
                return setMessage(result);
            }
            
            setMessage(result);
            setTimeout(() => {
                setIsRegistered(!isRegistered);
            }, 2000);

        } catch (err) {
            setMessage(err[0]);
            setIsRegistered(isRegistered);
        }
    };

    const submitUserInfo = (userInfo) => {
        register(userInfo);
    };

    return (
        <div>
            <h1>Register</h1>
            {/* <BattleNetAuth /> */}
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