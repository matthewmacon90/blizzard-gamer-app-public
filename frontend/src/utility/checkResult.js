const checkResult = (data) => {
    if (data === null || data === undefined || data === '' || Array.isArray(data)) {
        return false;
    }
    return data;
};

export default checkResult;