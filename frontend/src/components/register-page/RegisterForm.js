import {useForm, FormProvider} from "react-hook-form";
import Input from "../input-form/Input";
import { usernameSchema, passwordSchema, emailSchema, firstNameSchema, lastNameSchema } from "../../form-schema/registerFormSchema";

const RegisterForm = ({submit}) => {
    const initalState = {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
    };
    const methods = useForm({defaultValues: initalState});
    const {handleSubmit, reset} = methods;

    const onSubmit = (data) => {
        submit(data);
        reset({}, {
            keepErrors: false,
            keepDirty: false,
            keepIsSubmitted: false,
            keepTouched: false,
            keepIsValid: false,
            keepSubmitCount: false,
        });
    };

    //There is a bug on this input and the following after the form has been submitted and it is not resetting the state as intended. 
    return (
        <div>
            <FormProvider {...methods}> 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username">Username</label>
                    <Input id="username" type="text" placeholder="Username" validationRules={usernameSchema}/>

                    <label htmlFor="password">Password</label>
                    <Input id="password" type="password" placeholder="Password" validationRules={passwordSchema}/>

                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" placeholder="Email" validationRules={emailSchema}/>

                    <label htmlFor="firstName">First Name</label>
                    <Input id="firstName" type="text" placeholder="First Name" validationRules={firstNameSchema}/>

                    <label htmlFor="lastName">Last Name</label>
                    <Input id="lastName" type="text" placeholder="Last Name" validationRules={lastNameSchema}/>
                    <button type="submit">Register</button>
                </form>
            </FormProvider>
        </div>
    );
};

export default RegisterForm;