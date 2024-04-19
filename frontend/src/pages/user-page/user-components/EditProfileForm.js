import Input from "../../../components/input-form/Input";
import { useForm, FormProvider } from "react-hook-form";
import { usernameSchema, emailSchema, battleTagSchema } from "../../../form-schema/updateUserSchema";

const EditProfileForm = ({ user, editProfile, edit, updateUser }) => {
    const { username, email, firstName, lastName, battleTag = null } = user;

    const methods = useForm({
        defaultValues: {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            battleTag: battleTag
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

                {battleTag ? (
                    <p>Battle Tag: {battleTag}</p>
                ) : (
                    <div>
                        <label htmlFor={'battletag'}>{'Battle Tag'}:</label>
                        <Input id={'battletag'} placeholder={'Battletag#1234'} type={'text'} validationRules={battleTagSchema} />
                    </div>
                )
                }
                <p>First Name: {firstName}</p>
                <p>Last Name: {lastName}</p>

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
