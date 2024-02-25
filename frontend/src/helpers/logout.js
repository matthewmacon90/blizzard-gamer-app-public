const logout = (setCurrentUser) => {
    setCurrentUser(null);
    localStorage.clear();
};

export default logout;