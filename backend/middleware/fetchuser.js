const JWT=require('jsonwebtoken');
const JWT_Secret="PushkarIs$goodstudent";

const fetchuser=(req,res,next)=>{

    //  Get the user from the jwt token and add it to req object

    const token=req.header('auth-token');
    
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }

    try{
        const data=JWT.verify(token,JWT_Secret);// extracting payload from token after checking validity of token
        req.user=data.user;   
        next();  
    }catch(err){
        res.status(401).send({error:"Please authenticate using a valid token"}); 
    }

    

}


module.exports=fetchuser;