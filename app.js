require("./Config/database").connect();


const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const routes = require('./routes/routes.js')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require("express-fileupload");
const { Cookie } = require("express-session");
const cloudinary = require('cloudinary').v2




require('dotenv').config()

const app = express();

//####### use and set 
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('secretcookies'))
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/"
    })
  );

  app.use(session({
secret:"secretcookies",
cookie:{maxAAge: 60000},
resave:true,
saveUninitialized:true
  }))

  app.use(flash());






app.use('/', routes)




app.listen(process.env.PORT,()=>{
    console.log(`server is listening on ${process.env.PORT}`)
})