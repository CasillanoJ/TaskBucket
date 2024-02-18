const User = require('../Models/user_model');

const addUser = async (req, res, next) => {

  try {
    
    let{first_name, last_name, email, password, isAdmin, isVerified} = req.body
   
  
    const checkUser = await User.findOne({email: email})

    if(checkUser == null){

      const newUser = new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        isAdmin: isAdmin,
        isVerified: isVerified
    })

   await newUser.save().then((result)=>{
    res.status(200).send({
        successful: true,
        message:`Succesfully added User ${result.first_name} ${result.last_name}`,
        id: result._id
    })

   }).catch((error)=>{
        res.status(500).send({
            successful: false,
            message: error.message
        })
   })
    }else{
      res.status(400).send({
        successful: false,
        message:`Email is already taken`,
      
    })
    }
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message
  })
  }
   
};



const getAllUsers = async (req, res, next)=>{

  try{
      const users = await User.find()
      if(users.length != 0){
          res.status(200).json({
              successful: true,
              message: "Succesfully retrieved User details.",
              count: users.length,
               data: users
      })
    }else{
      res.status(200).json({
          successful: true,
          message: "No User data yet",
          count: users.length    
  })
    }
  }catch(error){
      res.status(500).send({
          successful: false,
          message: error.message
      })
  }

};


module.exports = {
  addUser,
  getAllUsers

}
