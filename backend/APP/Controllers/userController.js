const User = require('../Models/user_model');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')

const addUser = async (req, res, next) => {
  const saltRound = 10;

  try {
    let { first_name, last_name, email, password, isAdmin, isVerified } = req.body;

    const checkUser = await User.findOne({ email: email });

    const hashedPassword = await bcrypt.hash(password, saltRound);

    if (checkUser == null) {
      const newUser = new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
        isAdmin: isAdmin,
        isVerified: isVerified,
      });

      await newUser
        .save()
        .then((result) => {
          res.status(200).send({
            successful: true,
            message: `Successfully added User ${result.first_name} ${result.last_name}`,
            id: result._id,
          });
        })
        .catch((error) => {
          res.status(500).send({
            successful: false,
            message: error.message,
          });
        });
    } else {
      res.status(400).send({
        successful: false,
        message: `Email is already taken`,
      });
    }
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res, next)=>{

  try{
      const users = await User.find().select('-password')
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
        message: 'No User data yet',
        count: users.length,
      });
    }
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

const changePassword = async (req, res, next) => {
  const saltRound = 10;

  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        successful: false,
        message: 'New password and confirm password do not match',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        successful: false,
        message: 'User not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        successful: false,
        message: 'Invalid old password',
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltRound);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      successful: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    return res.status(500).json({
      successful: false,
      message: error.message,
    });
  }
};
const LoginUser = async (req, res, next)=>{

  try {
    const { email, password } = req.body;
    

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).send({
          successful: false,
          message: "Invalid Email Or Password"
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
          return res.status(400).send({
          successful: false,
          message: "Invalid Email Or Password"
      });

    }

    if(!user.isVerified){
      res.status(400).json({
        successful : false,
        message: "User is not verified",
      })
    }else{
      const accessToken = jwt.sign({ userId: user._id, email: user.email, first_name: user.first_name, last_name: user.last_name, isAdmin: user.isAdmin, isVerified: user.isVerified }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
      res.status(200).json({
        successful : true,
        message: "Succesfully Logged In",
        "Acess Token" :accessToken,
         "Refresh Token" : refreshToken
        });
    }
  


} catch (error) {
  res.status(500).send({
    successful: false,
    message: error.message
})
}
}

function VerifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
      return res.status(401).json({
        successful: "False",
         message: 'Token is required' 
        });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, decoded) => {
      if (err) {
          return res.status(401).json({
            successful: "False",
             message: 'Invalid Token' 
            });
      }
      req.user = decoded;

      console.log(decoded)
      next();
  });
}




module.exports = {
  addUser,
  getAllUsers,
  LoginUser,
  VerifyToken,
  changePassword,
};