import { useState } from "react";

const RegisterForm = ({submit}) => {
    const initalState = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };
    const [formData, setFormData] = useState(initalState);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(formData);
        setFormData(initalState);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required onChange={handleChange} value={formData.username} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required onChange={handleChange} value={formData.password} />

                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" required onChange={handleChange} value={formData.firstName} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" required onChange={handleChange} value={formData.lastName} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required onChange={handleChange} value={formData.email} />

                <button>Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;