import EditProfileForm from "./EditProfileForm";

const EditProfile = ({user, edit, editProfile, updateUser}) => {
    return (
        <div>
            <EditProfileForm user={user} edit={edit} editProfile={editProfile} updateUser={updateUser} />
        </div>
    );
};

export default EditProfile;