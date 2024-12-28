const  mongoose =require("mongoose")
require("dotenv").config();
const app = require('./app')

mongoose.connect(process.env.DATABASE_URL ).then(()=>{
    app.listen(process.env.PORT)
    console.log("database connected successfully");
    

}).catch((error)=>{
    console.log( error, " not database connected ")
})
