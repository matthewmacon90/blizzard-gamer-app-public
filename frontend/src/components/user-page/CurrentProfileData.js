const CurrentProfileData = ({ user }) => {
    const { username, email, firstname, lastname } = user;
    return (
        <div>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>First Name: {firstname}</p>
            <p>Last Name: {lastname}</p>
        </div>
    );
};

export default CurrentProfileData;