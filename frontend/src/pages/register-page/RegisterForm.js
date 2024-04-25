import {useForm, FormProvider} from "react-hook-form";
import {Link} from "react-router-dom";
import Input from "../../components/input-form/Input";
import { usernameSchema, passwordSchema, emailSchema, firstNameSchema, lastNameSchema, battleTagSchema } from "../../form-schema/registerFormSchema";

const RegisterForm = ({submit}) => {
    const initalState = {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        battleTag: ''
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

    return (
        <div className="RegisterForm-Container">
            <FormProvider {...methods}> 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username">Username</label>
                    <Input id="username" type="text" placeholder="Username" validationRules={usernameSchema} />

                    <label htmlFor="password">Password</label>
                    <Input id="password" type="password" placeholder="Password" validationRules={passwordSchema} />

                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" placeholder="Email" validationRules={emailSchema}/>

                    <label htmlFor="firstName">First Name</label>
                    <Input id="firstName" type="text" placeholder="First Name" validationRules={firstNameSchema} />

                    <label htmlFor="lastName">Last Name</label>
                    <Input id="lastName" type="text" placeholder="Last Name" validationRules={lastNameSchema} />
                    
                    <label htmlFor="battleTag">Battle Tag</label>
                    <Input id="battleTag" type="text" placeholder="battletag#1234" validationRules={battleTagSchema} />

                    <button type="submit">Register</button>
                </form>
                <div className="RegisterFormLogin-Container">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </FormProvider>
        </div>
    );
};

export default RegisterForm;