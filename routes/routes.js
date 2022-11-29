const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')


const  { home,signup,login,logout,userDocs,upload,userSignUp,userLogIn,uploadData,userDocsPostDlt} = require('../controller/routesMethod')



router.get('/', home);
router.get('/signup', signup);
router.get('/login', login);
router.get('/logout', logout);
router.get('/upload',auth, upload);
router.get('/doc',auth,userDocs);
router.post('/doc',auth,userDocsPostDlt);
router.post("/signup", userSignUp);
router.post("/Login", userLogIn);
router.post("/Upload",auth,uploadData);

module.exports = router
