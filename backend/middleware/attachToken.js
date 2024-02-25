const attachToken = (req, res, next) => {
    try {
        if (req.user && req.user.accessToken) {
            req.token = req.user.accessToken;
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = attachToken;