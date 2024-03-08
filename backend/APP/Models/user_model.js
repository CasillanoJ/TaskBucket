
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
        unique: [true, "Email is already Taken"],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required: [true,"Password is required."]
    },
    isAdmin:{
        type: Boolean,
        required: true
    },
    isVerified:{
        type: Boolean,
        required: true,
        default: false
    }
   

},{timestamps: true})

const User = mongoose.model('User',userSchema);


module.exports = User



