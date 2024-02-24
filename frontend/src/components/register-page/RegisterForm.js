import {useForm, FormProvider} from "react-hook-form";
import Input from "../input-form/Input";

const RegisterForm = ({submit}) => {
    const methods = useForm();
    const {handleSubmit, reset} = methods;

    const onSubmit = (data) => {
        submit(data);
        reset();
    };
    return (
        <div>
            <FormProvider {...methods}> 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username">Username</label>
                    <Input id="username" type="text" placeholder="Username" 
                        validationRules={{
                            required: 'This is required.',
                            maxLength: {
                                value: 30,
                                message: 'Your username is too long, the max length is 30 characters'
                            },
                        }}/>

                    <label htmlFor="password">Password</label>
                    <Input id="password" type="password" placeholder="Password" validationRules={{
                        required: 'This is required.',
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/,
                            message: `Password must have at least 12 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character`
                        },
                        minLength: {
                            value: 12,
                            message: `Password must have at least 12 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character`
                        }
                    }}/>

                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" placeholder="Email" validationRules={{
                        required: 'This is required.',
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email'
                        }
                    }}/>

                    <label htmlFor="firstName">First Name</label>
                    <Input id="firstName" type="text" placeholder="First Name" validationRules={{
                        required: 'This is required.',
                        maxLength: {
                            value: 30,
                            message: 'Your first name is too long, the max length is 30 characters'
                        }
                    }}/>

                    <label htmlFor="lastName">Last Name</label>
                    <Input id="lastName" type="text" placeholder="Last Name" validationRules={{
                        required: 'This is required.',
                        maxLength: {
                            value: 30,
                            message: 'Your last name is too long, the max length is 30 characters'
                        }
                    }}/>
                    <button type="submit">Register</button>
                </form>
            </FormProvider>
        </div>
    );
};

export default RegisterForm;