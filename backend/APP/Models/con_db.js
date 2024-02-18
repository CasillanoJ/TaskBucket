const constants = require('../../constants')
const mongoose = require('mongoose');

const uri = "mongodb+srv://taskbucket:ceutaskbucket@taskbucket.i0yu87n.mongodb.net/?retryWrites=true&w=majority"




const connectDB = () => {

   mongoose.connect(uri).then((result)=>{
    console.log("Succesfully connected to database")
   }).catch((error)=>{
        console.log(error)
        console.log("Fail to connect to database")
   })
}

module.exports = {
    mongoose,
    connectDB
};