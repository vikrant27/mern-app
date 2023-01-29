const jwt = require('jsonwebtoken');


const authenticationMiddleware = async(req,res,next) => {

    try {
        const token = req.header('auth-token');

        if(!token){
            return res.status(401).send({error: "Please authenticate using a valid token"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {id} = decoded
        //console.log(decoded);
        req.user = {id}
        next()
    } catch (error) {
        return res.status(401).send({error: "Please authenticate using a valid token"})
    }

    
}

module.exports = authenticationMiddleware