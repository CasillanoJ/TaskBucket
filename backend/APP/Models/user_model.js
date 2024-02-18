
const { mongoose } = require("./con_db")



const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required: [true,"First Name is required."]

    },
    last_name:{
        type:String,
        required: [true,"Last Name is required."]

    },
    email:{
        type:String,
        required: [true, "Email is Required"],
        unique: [true, "Email is already Taken"]
    },
    password:{
        type:String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true
    },
    isVerified:{
        type: Boolean,
        required: true,
    },
    TaskList:{
      type:[String],
      default :[]
    }

},{timestamps: true})

const User = mongoose.model('User',userSchema);


module.exports = User



