const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not Authorized");
            }
            req.user = decoded.user;
            const userType = req.user.userType;
            if(userType){
                console.log(`userType is: ${userType}`);
            }else{
                res.status(400);
                console.log("no userType");
            }
            
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User is not Authorized or token is missing");
        }
    }
});

module.exports = validateToken;