const Joi=require('joi');
const showProfileSchema={
    headers:{
        authorization:Joi.string().required()
    }
};
module.exports=showProfileSchema;