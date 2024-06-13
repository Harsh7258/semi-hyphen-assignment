const jwt = require("jsonwebtoken")
const AppError = require("../utils/appError")

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return next(new AppError('Not Authenticated, Access denied', 401));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // decoded contains the email
      next();
    } catch (error) {
      return next(new AppError('Invalid token, Generate token', 401));
    }
  };

module.exports = protect;