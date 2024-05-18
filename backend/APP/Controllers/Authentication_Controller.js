
const jwt = require('jsonwebtoken')

function GenerateTokens(user) {
 
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  
    if (!accessTokenSecret || !refreshTokenSecret) {
      throw new Error('JWT secrets are not defined');
    }
  
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    };
  
    // Generate the tokens with specific expiration times
    const newAccessToken = jwt.sign(tokenPayload, accessTokenSecret, { expiresIn: '1h' });
    const newRefreshToken = jwt.sign(tokenPayload, refreshTokenSecret, { expiresIn: '7d' });
  
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }


function VerifyToken(req, res, next) {
    // FOR TESTING PURPOSE
  const token = req.headers['authorization'];
  const refreshToken = req.headers['refreshToken'];

    // FOR COOKIES
    // const token = req.cookies.accessToken;
    //  const refreshToken = req.cookies.refreshToken;

  if (!token) {
      return res.status(401).json({
          successful: false,
          message: 'Token is required'
      });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
          if (err.name === 'TokenExpiredError') {
              if (!refreshToken) {
                  return res.sendStatus(401);
              } else {
                  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                      if (err) {
                          return res.sendStatus(403);
                      } else {
                          // Generate new tokens
                        const {newAccessToken, newRefreshToken} = GenerateTokens(user)

                          // Set new refresh token in cookie
                          res.cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 3600000 });
                          res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
                          req.user = user;
                          console.log(req.user)

                          next();
                      }
                  });
              }
          } else {
              return res.status(401).json({
                  successful: false,
                  message: 'Invalid Token'
              });
          }
      } else {

          req.user = decoded;
          console.log(req.user)
          next();
      }
  });
}

module.exports = {
GenerateTokens,
  VerifyToken
}