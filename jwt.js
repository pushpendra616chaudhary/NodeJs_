// jwtAuthMiddleware.js
const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //first check request headers has authorization or not
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "token Not Found" });
  // Extract the JWT token from the request header
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

//module.exports = jwtAuthMiddleware;

// Function to generate JWT token
const generateToken = (userData) => {
  // Generate a new JWT token using user data
  return jwt.sign({ user: userData }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { jwtAuthMiddleware, generateToken };
