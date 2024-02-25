import EditProfileForm from "./EditProfileForm";
import {usernameSchema, emailSchema, firstNameSchema, lastNameSchema} from "../../form-schema/registerFormSchema";

const EditProfile = ({user}) => {
    const {username, email, firstname, lastname} = user;
    return (
        <div>
            <EditProfileForm type="text" previousValue={username} fieldToChange={"username"} 
                label="Username" schema={usernameSchema} />
            <EditProfileForm type="email" previousValue={email} fieldToChange={"email"}
                label="Email" schema={emailSchema} /> 
            <EditProfileForm type="text" previousValue={firstname} fieldToChange={"firstname"}
                label="First Name" schema={firstNameSchema} /> 
            <EditProfileForm type="text" previousValue={lastname} fieldToChange={"lastname"}
                label="Last Name" schema={lastNameSchema} /> 
        </div>
    );
};

export default EditProfile;