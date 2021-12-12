const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }
    next()
}

const verifyToken = (req, res, next) => {
    let decodedToken 
    if (req.token) {
     decodedToken = jwt.verify(req.token, process.env.SECRET)
    } else {
         return res.status(401).send({
             error: 'token missing or invalid'
         })
    }
     if (!req.token || !decodedToken.userId) {
         return res.status(401).send({
             error: 'token missing or invalid'
         })
     } else {
         req.user_id = decodedToken.userId
         next()
     }
    
}

module.exports = { tokenExtractor, verifyToken }
