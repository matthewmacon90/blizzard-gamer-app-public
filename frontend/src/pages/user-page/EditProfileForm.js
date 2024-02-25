import Input from "../../components/input-form/Input";
import {useForm, FormProvider } from "react-hook-form";
import {usernameSchema, emailSchema, firstNameSchema, lastNameSchema} from "../../form-schema/updateUserSchema";
import ProfileButton from "./ProfileButton";

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
        console.log(data);
        updateUser(data);
        editProfile();
        // updatedUser(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor={'username'}>{'Username'}:</label>
                <Input id={'username'} placeholder={username} type={'text'} validationRules={usernameSchema} />

                <label htmlFor={'email'}>{'Email'}:</label>
                <Input id={'email'} placeholder={email} type={'email'} validationRules={emailSchema} />

                <label htmlFor={'firstname'}>{'First Name'}:</label>
                <Input id={'firstname'} placeholder={firstname} type={'text'} validationRules={firstNameSchema} />

                <label htmlFor={'lastname'}>{'Last Name'}:</label>
                <Input id={'lastname'} placeholder={lastname} type={'text'} validationRules={lastNameSchema} />
                {edit && <button type="submit">Save Changes</button>}
                
            </form>
        </FormProvider>
    );
};

export default EditProfileForm;
