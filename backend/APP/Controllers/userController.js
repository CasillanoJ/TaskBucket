const User = require("../Models/user_model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { GenerateTokens } = require("./Authentication_Controller");

const addUser = async (req, res, next) => {
  const saltRound = 10;

  try {
    let { first_name, last_name, email, password } = req.body;

    const checkUser = await User.findOne({ email: email });

    const hashedPassword = await bcrypt.hash(password, saltRound);

    if (checkUser == null) {
      const newUser = new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
        isAdmin: false,
        isVerified: false,
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

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isVerified: true }).select("-password");
    if (users.length != 0) {
      res.status(200).json({
        successful: true,
        message: "Succesfully retrieved User details.",
        count: users.length,
        data: users,
      });
    } else {
      res.status(200).json({
        successful: true,
        message: "No User data yet",
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
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.userId;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        successful: false,
        message: "New password and confirm password do not match",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        successful: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        successful: false,
        message: "Invalid old password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltRound);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      successful: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      successful: false,
      message: error.message,
    });
  }
};
const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({
        successful: false,
        message: "Invalid Email Or Password",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({
        successful: false,
        message: "Invalid Email Or Password",
      });
    }

    if (!user.isVerified) {
      res.status(400).json({
        successful: false,
        message: "User is not verified",
      });
    } else {
      const { accessToken, refreshToken } = GenerateTokens(user);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 3600000,
      }); // Max age in milliseconds (1 hour)
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 604800000,
      }); // Max age in milliseconds (7 days)

      res.status(200).json({
        successful: true,
        message: "Succesfully Logged In",
        "Acess Token": accessToken,
        "Refresh Token": refreshToken,
      });
    }
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

const VerifyUser = async (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;
    const user = req.body.userID;

    if (isAdmin) {
      const user = await User.findOne(user);

      if (!user) {
        res.status(404).json({
          successful: false,
          message: `Cannot Find the user`,
        });
      } else {
        user.isVerified = true;
        await user.save();

        res.status(200).json({
          successful: true,
          message: "Succesfully Verified the User",
          user: user.id,
        });
      }
    } else {
      res.status(401).json({
        successful: false,
        message: `Unauthorized access`,
      });
    }
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

const LogoutUser = async (req, res, next) => {
  res.clearCookie("accessToken", { httpOnly: true });

  res.clearCookie("refreshToken", { httpOnly: true });

  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ successful: false, message: "Failed to logout" });
      }
    });
  }

  return res
    .status(200)
    .json({ successful: true, message: "Logout successful" });
};

module.exports = {
  addUser,
  getAllUsers,
  LoginUser,
  changePassword,
  VerifyUser,
  LogoutUser,
};
