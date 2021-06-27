// const jwt = require('jsonwebtoken')

// const tokenExtractor = (req, res, next) => {
//     console.log('hello from middleware')
//     const authorization = req.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         res.token = authorization.substring(7)
//     }
//     next()
// }

// const verifyToken = (req, res, next) => {
//     let decodedToken 
//     if (req.token) {
//      decodedToken = jwt.verify(req.token, process.env.SECRET)
//     }
//      if (!req.token || !decodedToken.id) {
//          return res.status(401).send({
//              error: 'token missing or invalid'
//          })
//      } else {
//          req.user_id = decodedToken.id
//          console.log(req)
//          next()
//      }
    
// }

// module.exports = { tokenExtractor, verifyToken }
