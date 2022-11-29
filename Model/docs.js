const mongoose = require('mongoose');

const docsScheama = new mongoose.Schema({
    fileName: String,
    imgUrl: String,
    userId:String,


})






module.exports = mongoose.model("doc", docsScheama)