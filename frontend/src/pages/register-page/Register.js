import RegisterForm from "./RegisterForm";
import Api from "../../api";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import "./RegisterStyles.css";

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
        }
    };

    const submitUserInfo = (userInfo) => {
        register(userInfo);
    };

    return (
        <div className="Register-Container">
            <h1 className="RegisterHeading">Join us today!</h1>
            <RegisterForm submit={submitUserInfo}/>
            {message &&
                <div className="Register-Message-Container"> 
                    <p>{message}</p>
                </div>
            }
            {isRegistered ? <Navigate to="/login"/> : null}
        </div>
    );
};

export default Register;