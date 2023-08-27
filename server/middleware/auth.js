const jwt = require("jsonwebtoken");


const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: 'Invalid token' });
          }
      
          req.username = decoded.username; // Extract the username from the token
          next();
        });
    } else {
      res.sendStatus(401);
    }
  };

  const secretKey = "superS3cr3t1";

  module.exports = {
    authenticateJwt,
    secretKey
  }
