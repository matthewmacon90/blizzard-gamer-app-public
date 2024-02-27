import Input from "../../components/input-form/Input";
import {useForm, FormProvider } from "react-hook-form";
import {usernameSchema, emailSchema} from "../../form-schema/updateUserSchema";

const EditProfileForm = ({user, editProfile, edit, updateUser}) => {
    const {username, email, firstname, lastname} = user;

    const methods = useForm({
        defaultValues: {
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname
        }
    });
    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        updateUser(data);
        editProfile();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor={'username'}>{'Username'}:</label>
                <Input id={'username'} placeholder={username} type={'text'} validationRules={usernameSchema} />

                <label htmlFor={'email'}>{'Email'}:</label>
                <Input id={'email'} placeholder={email} type={'email'} validationRules={emailSchema} />

                <p>First Name: {firstname}</p>
                <p>Last Name: {lastname}</p>

                {edit && <button type="submit">Save Changes</button>}
                
            </form>
        </FormProvider>
    );
};

export default EditProfileForm;
