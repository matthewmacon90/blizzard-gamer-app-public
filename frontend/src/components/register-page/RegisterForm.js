import { useState } from "react";
import {useForm} from "react-hook-form";

const RegisterForm = ({initalState, submit}) => {
    const [formData, setFormData] = useState(initalState);
    const {register, handleSubmit, watch, formState:{errors}} = useForm();

    // console.log('watch', watch('username'));
    // console.log('FORM: ', formState.errors)

    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setFormData({...formData, [name]: value});
    // };

    const onSubmit = (data) => console.log('data ', data);
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     submit(formData);
    //     setFormData(initalState);
    // };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username</label>
                {/* <input type="text" id="username" name="username" required onChange={handleChange} value={formData.username} /> */}
                <input id="username" type="text" {...register('username', {maxLength: 30, required: true})} />

                <label htmlFor="password">Password</label>
                {/* <input type="password" id="password" name="password" required onChange={handleChange} value={formData.password} /> */}
                <input id="password" type="password" {...register('password')} />

                <label htmlFor="firstName">First Name</label>
                {/* <input type="text" id="firstName" name="firstName" required onChange={handleChange} value={formData.firstName} /> */}
                <input id="firstName" type="text" {...register('firstName')} />

                <label htmlFor="lastName">Last Name</label>
                {/* <input type="text" id="lastName" name="lastName" required onChange={handleChange} value={formData.lastName} /> */}
                <input id="lastName" type="text" {...register('lastName')} />

                <label htmlFor="email">Email</label>
                {/* <input type="email" id="email" name="email" required onChange={handleChange} value={formData.email} /> */}
                <input id="email" type="email" {...register('email')} />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;