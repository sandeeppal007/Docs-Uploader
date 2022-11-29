const mongoose = require('mongoose');
require('dotenv').config()

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URL,  {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(console.log("DB CONNECTED with a success"))
      .catch(err=>{
        console.log("database connection failed error => " + err);
        process.exit(1)
      })
}
   
