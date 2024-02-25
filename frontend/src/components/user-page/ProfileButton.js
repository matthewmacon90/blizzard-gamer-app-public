const ProfileButton = ({edit, editProfile}) => {
    const handleEdit = () => {
        editProfile();
    };
    return (
        <div className="profileButton-container">
            {edit ? 
                (<button onClick={handleEdit} type="submit">
                    Save Changes
                </button>) 
                : 
                (<button onClick={handleEdit}>
                    Edit Profile
                </button>)}
        </div>
    );
};

export default ProfileButton;