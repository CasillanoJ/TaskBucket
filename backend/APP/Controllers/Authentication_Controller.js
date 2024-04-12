
const jwt = require('jsonwebtoken')

function GenerateToken(user, time) {
  
  const Token = jwt.sign({ userId: user._id, email: user.email, first_name: user.first_name, last_name: user.last_name, isAdmin: user.isAdmin, isVerified: user.isVerified }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${time}` });
  

  return Token
  
}


function VerifyToken(req, res, next) {
  const token = req.headers['authorization'];
  const refreshToken = req.cookies.refreshToken;
  if (!token) {
      return res.status(401).json({
        successful: "False",
         message: 'Token is required' 
        });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, decoded) => {
      
      
      if (err) {
        if(err.name === 'TokenExpiredError'){
            if (!refreshToken) {
              return res.sendStatus(401);
          }else {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
              if (err) {
                  return res.sendStatus(403);
              } else {
                  let accessToken = GenerateToken(user);
                  req.user = user;
                  next();
              }
          });
          }
           
        }
        
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
  GenerateToken,
  VerifyToken
}