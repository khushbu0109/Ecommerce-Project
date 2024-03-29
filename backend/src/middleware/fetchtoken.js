const jwt = require("jsonwebtoken");
const JWT_SETCRET = "theasianvipsgrow";
const fetchUser = (req, res, next)=>{
    const token = req.header("auth-token");
    if(!token){
        return res.status(209).json({status:"Failed", msg:"Please authenticate using a valid token"});
    }

    try {
        const data = jwt.verify(token, JWT_SETCRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(209).json({status:"Failed", msg:"Please authenticate using a valid token"});
    }
}

module.exports = fetchUser;