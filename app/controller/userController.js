
const { SECRETKEY } = require("../../config");
const { createSession, findOneSession } = require("../services/sessionService");
const { findOneUser, createUser } = require("../services/userService");
const MESSAGES = require("../utils/message");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const userController={};

userController.signUp=async(req,res)=>{
    const payload=req.body;
    if(await findOneUser({email:payload.email})){
        return res.json({message:MESSAGES.EMAIL_EXIST});
    }
    payload.password=await bcrypt.hash(payload.password,8);
    const user=await createUser(payload);
    const token=jwt.sign({_id:user._id},SECRETKEY);
    const session={
        token:token,
        userId:user._id
    }
    createSession(session);
    return res.json({message:MESSAGES.ACCOUNT_CREATED});
}

userController.login=async(req,res)=>{
    const payload=req.body;
    const user= await findOneUser({email:payload.email});
    const password=await bcrypt.compare(payload.password,user.password);
    if(user && password){
        const token=jwt.sign({_id:user._id},SECRETKEY);
        const session={
            token:token,
            userId:user._id
        }
        await createSession(session);
        return res.json({message:MESSAGES.LOGIN_SUCCESSFUL});
    }
    return res.json({message:MESSAGES.INVALID_CREDENTIALS});
}

userController.showProfile=async(req,res)=>{

    res.json({message:req.user});

}





module.exports=userController;