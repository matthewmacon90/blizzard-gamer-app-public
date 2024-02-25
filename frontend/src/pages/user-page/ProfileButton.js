const ProfileButton = ({edit, editProfile}) => {
    const handleEdit = () => {
        editProfile();
    };

    return (
        <div className="profileButton-container">
            {edit ? null : (<button onClick={handleEdit}>Edit Profile</button>)}
        </div>
    );
};

export default ProfileButton;