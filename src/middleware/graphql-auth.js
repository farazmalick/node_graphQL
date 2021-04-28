const jwt=require('jsonwebtoken')
const User=require('../models/user')

module.exports=async (req,res,next)=>
{
    try
    {
        const token=req.header('Authorization').replace('Bearer ','')
    //console.log(token)
    const decoded=await jwt.verify(token,'jwtsecret')
    //console.log(decoded)
    const user=await User.findOne({_id:decoded._id,'tokens.token':token})
    if(!user)
    {
        req.isAuth=false
        return next()
    }
    req.user=user
    req.token=token
    req.isAuth=true
    next()
    }
    catch(error)
    {
        req.isAuth=false
        return next()
    }

    
}


