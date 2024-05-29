const User = require("../Models/user_model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { GenerateTokens, VerifyToken } = require("./Authentication_Controller");

const { SendEmail } = require("../Controllers/nodeEmailerController");

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

const getAllVerifiedUsers = async (req, res, next) => {
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

const getAllUnverifiedUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isVerified: false }).select("-password");

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
      res.status(200).json({
        successful: true,
        message: "User is not verified",
        user: {
          isVerified: user.isVerified,
        },
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
        "Access Token": accessToken,
        "Refresh Token": refreshToken,
        user: {
          isAdmin: user.isAdmin,
          isVerified: user.isVerified,
        },
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
    const userIds = req.body.userIds;

    if (isAdmin) {
      if (!Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({
          successful: false,
          message:
            "Request body must be an array of user IDs and cannot be empty",
        });
      }

      const results = [];
      for (const userId of userIds) {
        const user = await User.findById(userId);

        if (!user) {
          results.push({
            userId,
            successful: false,
            message: "Cannot find the user",
          });
        } else if (user.isVerified) {
          results.push({
            userId,
            successful: true,
            message: "User is already verified",
          });
        } else {
          user.isVerified = true;
          await user.save();
          results.push({
            userId,
            successful: true,
            message: "Successfully verified the user",
          });
        }
      }
      res.status(200).json({
        successful: true,
        message: "User verification process completed",
        results,
      });
    } else {
      res.status(401).json({
        successful: false,
        message: "Unauthorized access",
      });
    }
  } catch (error) {
    res.status(500).json({
      successful: false,
      message: error.message,
    });
  }
};


const RejectUser = async (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;
    const userIds = req.body.userIds;

    if (isAdmin) {
      if (!Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({
          successful: false,
          message:
            "Request body must be an array of user IDs and cannot be empty",
        });
      }

      const results = [];
      for (const userId of userIds) {
        const user = await User.findById(userId);

        if (!user) {
          results.push({
            userId,
            successful: false,
            message: "Cannot find the user",
          });
        } else {
          await User.deleteOne({ _id: userId });
          results.push({
            userId,
            successful: true,
            message: "Successfully deleted the user",
          });
        }
      }

      res.status(200).json({
        successful: true,
        message: "User deletion process completed",
        results,
      });
    } else {
      res.status(401).json({
        successful: false,
        message: "Unauthorized access",
      });
    }
  } catch (error) {
    res.status(500).json({
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

const GetChangePasswordCode = async (req, res, next) => {
  try {
    const email = req.body.email;

    if (email == null || email == "") {
      return res.status(404).json({
        successful: false,
        message: `Invalid Email`,
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        successful: false,
        message: `Cannot Find the user`,
      });
    }

    function generateRandomString(length) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    }

    const VerificationCode = generateRandomString(8);

    user.forgot_password_code = VerificationCode;
    user.forgot_password_code_created_at = Date.now();

    await user.save();
    SendEmail(VerificationCode, "Verification Code", user.email);
    return res.status(200).send({
      successful: true,
      message: "Succesfully Sent A Verification Code to your Email",
    });
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

const VerifiyCode = async (req, res, next) => {
  try {
    const code = req.body.code;
    const email = req.body.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        successful: false,
        message: `Cannot Find the user`,
      });
    }

    if (user.forgot_password_code != code) {
      return res.status(400).json({
        successful: false,
        message: "Invalid Verification Code",
      });
    }

    const expirationTime = new Date(
      user.forgot_password_code_created_at.getTime() + 10 * 60 * 1000
    );

    if (expirationTime > new Date()) {
      return res.status(200).json({
        successful: true,
        message: "Successfully Validated Code",
      });
    } else {
      return res.status(400).json({
        successful: false,
        message: "Verification Code is already Expired",
      });
    }
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

module.exports = {
  addUser,
  getAllVerifiedUsers,
  getAllUnverifiedUsers,
  LoginUser,
  changePassword,
  VerifyUser,
  RejectUser,
  LogoutUser,
  GetChangePasswordCode,
  VerifiyCode,
};
