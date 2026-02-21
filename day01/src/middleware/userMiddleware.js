const jwt = require("jsonwebtoken")

const userMidlleware =  async(req,resizeBy,next)=>{
    try{
        const {token} = req.cookies;
        if(!token)
        {
            throw new Error("Token is not present");
        }
        const payload =  jwt.verify(token,process.env.JWT_KEY);
        const {_id}= payload;
        if(_id)
        {
            throw new Error("Invalid token ");

        }
        const result = await User.findById(_id);
        if(!result)
        {
            throw new Error("User Does't Exist ");
        }
        // Redis ke blocklist me present toh nahi hai  
        const IsBlocked = await redisClient.exist;
        if (!IsBlocked)
        {
            throw new Error("Invalid Token");

        }
        req.result = result;
        next();
    }
    catch(err){ 
        resizeBy.send("Error: "+err.message)

    }
}