const jwt = require('jsonwebtoken')

exports.isAuthenticated = (req, res, next) => {
    if(req.headers.authorization == null || req.headers.authorization == ""){
        console.log("headers missing")
        return res.status(401).json("Unauthorized access")
    }
    const token = req.headers.authorization.split(" ");
    console.log(token);
    jwt.verify(token[1], process.env.SECRET, (err, data) => {
        if(err){
            console.log("invalid token")
            return res.status(401).json({
                error:err.message
            })
        }
        req.auth = data;
        console.log(data)
        next();
    })
}