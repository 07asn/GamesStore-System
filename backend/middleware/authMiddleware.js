const jwt = require('jsonwebtoken');
const Cookie = require('js-cookie'); // Make sure this works on the server side as well

const authenticate = (req, res, next) => {
  const token = req.cookies.token;  // Get token from cookies

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user data to the request
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;
