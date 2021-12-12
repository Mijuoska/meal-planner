const jwt = require('jsonwebtoken')

const authorizeRequest = (req, res, next) => {
    if (req.originalUrl.startsWith('/api/auth')) {
        return next()
        }
    tokenExtractor(req, res)
    verifyToken(req, res)
    return next()
}

const tokenExtractor = (req, res) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }
}

const verifyToken = (req, res) => {
    let decodedToken 
    if (req.token) {
     decodedToken = jwt.verify(req.token, process.env.SECRET)
    } else {
         return res.status(401).send({
             error: 'token missing or invalid'
         })
    }
     if (!decodedToken.userId) {
         return res.status(401).send({
             error: 'token missing or invalid'
         })
     } else {
         req.user_id = decodedToken.userId
     }
    
}

module.exports = { authorizeRequest }
