const jwt = require('jsonwebtoken');






const auth = (req,res,next)=>{
    const token = req.cookies.token;

    // || req.body.token ||  req.header('Authorization').replace('Bearer ', "");

    if(!token){

        return res.status(403).redirect("/login");
    }

 

    try {

     const decode  = jwt.verify(token,'shhhhhhbhugkfhgfghdgtyrytfhgfuytyyyyyyghggfhvxfghgffbcjhgc')
     console.log(decode);






    } catch(error){
        return res.status(403).send("invalid Token")
    }

    return next();

};

module.exports = auth;