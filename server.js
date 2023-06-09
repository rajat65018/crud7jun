require("dotenv").config();
const express = require("express");

const dbConnect = require("./app/startup/dbConnect");
const { PORT } = require("./config");
const router = require("./app/router/userRoutes");
const path=require('path');
const app = express();
const mustacheExpress=require('mustache-express');
app.engine('html',mustacheExpress());
app.set('view engine','html');
app.set('views','/Users/zestgeek-21/Desktop/crud/views');
// app.set('view engine','pug');
// app.set('views',path.join(__dirname,'views'));
// app.set('view engine','pug');
app.use(express.json());

app.use(router);
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log("server running");
  });
});
