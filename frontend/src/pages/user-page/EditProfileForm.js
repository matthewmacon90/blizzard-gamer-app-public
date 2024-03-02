import Input from "../../components/input-form/Input";
import {useForm, FormProvider } from "react-hook-form";
import {usernameSchema, emailSchema, battleTagSchema} from "../../form-schema/updateUserSchema";

const EditProfileForm = ({user, editProfile, edit, updateUser}) => {
    const {username, email, firstname, lastname, battletag=null} = user;

    const methods = useForm({
        defaultValues: {
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname,
            battletag: battletag
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
                
                {battletag ? (
                    <p>Battle Tag: {battletag}</p>
                    ) : (
                    <div>
                        <label htmlFor={'battletag'}>{'Battle Tag'}:</label>
                        <Input id={'battletag'} placeholder={'Battletag#1234'} type={'text'} validationRules={battleTagSchema} /> 
                    </div>
                    )
                }
                <p>First Name: {firstname}</p>
                <p>Last Name: {lastname}</p>

                {edit && 
                    <div>
                        <button type="submit">Save Changes</button>
                        <button onClick={editProfile}>Cancel</button>
                    </div>
                }
            </form>
        </FormProvider>
    );
};

export default EditProfileForm;
