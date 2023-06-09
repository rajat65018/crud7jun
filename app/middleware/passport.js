const { SECRETKEY } = require("../../config");
const userModel = require("../models/userModel");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;


module.exports=function (passport){
  const options={};
  options.secretOrKey=SECRETKEY;
  options.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
  passport.use(new JwtStrategy(options,(payload,done)=>{
    userModel.findOne({_id:payload._id,isDeleted:false}).then((user)=>{
      if(!user){
       return done(null,false);
      }
      return done(null,user);
    }).catch((err)=>{
      done(err,false);
    })
  }))
}
