
const mongoose = require('mongoose');

const uri = "mongodb+srv://taskbucket:ceutaskbucket@taskbucket.i0yu87n.mongodb.net/?retryWrites=true&w=majority"


const connectDB = () => {

   mongoose.connect(process.env.MONGO_URI).then((result)=>{
    console.log("Succesfully connected to database")
   }).catch((error)=>{
        console.log(error)
        console.log("Fail to connect to database")
        process.exit(1)
   })
}

module.exports = {
    mongoose,
    connectDB
};