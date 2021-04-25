const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        res.token = authorization.substring(7)
    }
    next()
}


module.exports = { tokenExtractor }
