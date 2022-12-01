const mongoose = require('mongoose');
const User = require('../Model/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Doc = require('../Model/docs')


const cloudinary = require('cloudinary').v2


cloudinary.config({ 
    cloud_name: 'dk13qliov', 
    api_key: '253586976514751', 
    api_secret: 'd7tM77rktJ8RY1_Htbbd1SKZZAs' 
  });




// get request

const home = ((req, res) => {
    res.render("index")
})
const signup = ((req, res) => {
 
    res.render("signup",)
})
const login = ((req, res) => {
  
    const signupMessage = req.flash('message')
    res.render("login",{signupMessage:signupMessage})
})
const logout = ((req, res) => {
  



        res.clearCookie("token");
        console.log("logout successfully")
        res.redirect('/')
       
        
        
        
    
    
    })
    

const upload =(req, res) => {
    res.render("upload")
}







// post request
const userSignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body


        if (!(firstName && lastName && email && password)) {
            res.status(401).send("All fileds are required")

        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(401).send("User already found in database")
        }


        const passEncrypted = await bcrypt.hash(password, 13);




        const user = new User({
            firstName,
            lastName,
            email,
            password: passEncrypted

        })


        const token = jwt.sign({
            id: user._id,

        }, process.env.SECRET_KEY_TOKEN)

        user.token = token


        user.save()
            .then(console.log("success send data"))
            .then(req.flash('message',"Successfully signup"))
            .then(res.redirect('/login'))
            .catch((err) => {
                console.log(`data not send from signup => ${err}`)
                res.redirect("/signup")
            })



    } catch (error) {
        console.log("catch erro" + error);
        console.log("Error is response route");
    }

}



// ### login ###################

const userLogIn = async (req,res)=>{
try {


    const {email,password} = req.body

    if (!(email && password)) {
        res.status(401).send("email and password is required")
    }

    const user= await User.findOne({email: email})

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({id: user._id, email}, 'shhhhhhbhugkfhgfghdgtyrytfhgfuytyyyyyyghggfhvxfghgffbcjhgc', {expiresIn: '2h'})

        user.password = undefined
        user.token = token

        const options = {
            expires: new Date(Date.now() +  (60*100000) * 5),
            httpOnly: true
        }
      
        res.status(200).cookie("token", token, options).redirect("/upload")
    
}  else {
    // req.flash('message', 'invalid details');
    res.status(400).render("login",{error:"inavlid"})
    }

}catch (error) {
    console.log(error);
    res.send("login eroro" + error)

}



} 




// ## upload 


const uploadData = async (req,res)=>{

    let file = req.files.userDoc;
  result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "users",
  });


    let dashToken = req.cookies.token

 
    let jwtDecode =jwt.verify(dashToken,'shhhhhhbhugkfhgfghdgtyrytfhgfuytyyyyyyghggfhvxfghgffbcjhgc');


      const doc = new Doc ({
        fileName: req.body.filename,
        imgUrl: result.secure_url,
        userId:jwtDecode.id
    })
    doc.save().then(console.log("success uplaod"))
.catch(err => console.log(" file not upload " + err))
res.redirect("doc")
    
   







}


// show docs

const userDocs = ((req, res) => {
   

    let dashToken = req.cookies.token

 
    let jwtDecode =jwt.verify(dashToken,'shhhhhhbhugkfhgfghdgtyrytfhgfuytyyyyyyghggfhvxfghgffbcjhgc')
 

   if(!dashToken){
    res.send("/login")
   }

    let docsInfo = Doc.find({userId:jwtDecode.id},(err,a)=>{
        if(!err){
        
 
          

                res.render("doc",{img:a})
        

        }
        else{
            res.send("eroor")
        }
    })






})

// delete files

const userDocsPostDlt = (req,res) =>{

const id = req.body.remove;




Doc.deleteOne({_id:id},(err,rslt)=>{
if(err){
    console.log(err)
}else{
    console.log(rslt);
    res.redirect("doc");
}


})


}


module.exports = { home, signup, login, logout, upload,userDocs,userSignUp, userLogIn,uploadData,userDocsPostDlt };

