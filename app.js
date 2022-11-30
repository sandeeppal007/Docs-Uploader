require("./config/database").connect();
const express = require('express');
const path = require('path');
const routes = require('./routes/routes.js')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary').v2


require('dotenv').config()

const app = express();

//####### use and set 
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/"
    })
  );






app.use('/', routes)




app.listen(process.env.PORT,()=>{
    console.log(`server is listening on ${process.env.PORT}`)
})