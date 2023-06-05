const express=require('express');
const validateJoiSchema = require('../middleware/validateJoiSchema');
const signUpSchema = require('../validate/signUpSchema');
const { signUp, login, showProfile } = require('../controller/userController');
const loginSchema = require('../validate/loginSchema');
const showProfileSchema = require('../validate/showProfileSchema');
const router=express.Router();
const passport=require('passport');
require('../middleware/passport')(passport);

router.post('/signup',validateJoiSchema(signUpSchema),signUp);

router.post('/login',validateJoiSchema(loginSchema),login);

router.get('/showprofile',validateJoiSchema(showProfileSchema),
                     passport.authenticate('jwt',{session:false}),showProfile);

module.exports=router;