require('dotenv').config();
const express=require('express');
const dbConnect = require('./app/startup/dbConnect');
const { PORT } = require('./config');
const router = require('./app/router/userRoutes');
const passport=require('passport');
// require('./app/middleware/passport')(passport);
const app=express();
app.use(express.json());
// app.use(passport.initialize());
app.use(router);
dbConnect().then(()=>{
    app.listen(PORT,()=>{
        console.log('server running');
    })
})