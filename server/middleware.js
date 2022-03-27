const checkIfLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(403).json({
            error: 'user not logged in'
        })
    } else {
       next()
    }
}





module.exports = {
    checkIfLoggedIn
}