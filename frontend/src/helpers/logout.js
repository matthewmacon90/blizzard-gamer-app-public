const logout = (setCurrentUser) => {
    setCurrentUser(null);
    sessionStorage.clear();
};

export default logout;