const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // take token from the request header
  const token = req.header('x-auth-token');

  // no token, deny access
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // verify if token valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // user's info from the token to the request object
    req.user = decoded.user;

    // API route logic next()
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;