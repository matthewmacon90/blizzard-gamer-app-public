import EditProfile from "./EditProfile";
import { useState } from "react";
import {usernameSchema, emailSchema, firstNameSchema, lastNameSchema} from "../../form-schema/registerFormSchema";

const Profile = ({user}) => {
    const [edit, setEdit] = useState(false);
    const {username, email, firstname, lastname} = user;

    return (
        <div className="profile-container">
            <h2>Profile Information</h2>
            {edit ? (
                        <div>
                            <EditProfile type="text" previousValue={username} fieldToChange={"username"} 
                                label="Username" schema={usernameSchema} />
                            <EditProfile type="email" previousValue={email} fieldToChange={"email"}
                                label="Email" schema={emailSchema} /> 
                            <EditProfile type="text" previousValue={firstname} fieldToChange={"firstname"}
                                label="First Name" schema={firstNameSchema} /> 
                            <EditProfile type="text" previousValue={lastname} fieldToChange={"lastname"}
                                label="Last Name" schema={lastNameSchema} /> 
                        </div>
                    ) 
                    :
                    (   <div>
                            <p>Username: {username}</p>
                            <p>Email: {email}</p>
                            <p>First Name: {firstname}</p>
                            <p>Last Name: {lastname}</p>
                        </div>
                    )
            }

            {edit ? 
                (<button onClick={() => setEdit(!edit)} type="submit">Save Changes</button>) 
                : 
                (<button onClick={() => setEdit(!edit)}>Edit Profile</button>)}
        </div>
    );
};

export default Profile;
