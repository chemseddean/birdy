const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next){
    // Get token from header
    const token = req.header('x-auth-token')
    // Check if not token 
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'})
    }
    //Verify token 
    try {
        //console.log(req.user)
        const decoded = jwt.verify(token, config.get('mySecretKey'))
        req.user = decoded.user; 
        req.userIDonMongo = decoded.userIDonMongo;
        next()
    } catch (e) {
        res.status(403).json({msg: 'Token is not valid'})
    }
}
