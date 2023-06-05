const Joi=require('joi');
const signUpSchema={
    body:{
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(20).required(),
    }
}
module.exports=signUpSchema;