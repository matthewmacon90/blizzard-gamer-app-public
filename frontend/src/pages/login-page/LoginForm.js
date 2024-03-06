import { useState } from "react";

const LoginForm = ({error, login, setError}) => {
    const initalState = {
        username: '',
        password: '',
    };
    const [formState, setFormState] = useState(initalState);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setError(null);
        setFormState({...formState, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formState);
        setFormState(initalState);
    };

    return (
        <div className="LoginForm-Container">
            <form className="LoginForm" onSubmit={handleSubmit}>
                <label htmlFor={'username'}>Username</label>
                <input id={'username'} placeholder={'username'} type={'text'} name="username" value={formState.username} onChange={handleChange}/>

                <label htmlFor={'password'}>Password</label>
                <input id={'password'} placeholder={'password'} type={'password'} name="password" value={formState.password} onChange={handleChange}/>

                <button type={'submit'}>Login</button>
            </form>
            {error && <p className="LoginFormError-Message">{error}</p>}
        </div>
    );
};

export default LoginForm;
