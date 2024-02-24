import {useForm, FormProvider } from "react-hook-form";
import Input from "../input-form/Input";

const LoginForm = ({submitLogin}) => {
    const initalState = {
        username: '',
        password: '',
    };
    const methods = useForm({defaultValues: initalState});
    const {handleSubmit, reset} = methods;

    const onSubmit = (data) => {
        submitLogin(data);
        reset(initalState);
    };

    return (
        <div>
            <h1>Login</h1>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor={'username'}>Username</label>
                <Input id={'username'} placeholder={'username'} type={'text'} />

                <label htmlFor={'password'}>Password</label>
                <Input id={'password'} placeholder={'password'} type={'password'} />

                <button type={'submit'}>Login</button>
                </form>

            </FormProvider>
        </div>
    );
};

export default LoginForm;
