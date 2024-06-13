const express = require("express");
require("dotenv").config();
const xss = require("xss-clean")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")

const globalErrorHandler = require("./controllers/errorController");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const AppError = require("./utils/appError");

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Data sanitization against XSS
app.use(xss()); // cross-site scripting protects from malicious HTML code(tags)
// Implementing Rate Limiting
const limiter = rateLimit({
    max: 20,
    windowMs: 60 * 60 * 1000,
    message: 'TOO many requests from this IP, Please try again in a hour!!'
}); // LIMITING IP requests form one users
// Set security HTTP headers
app.use(helmet());

app.get('/', (req, res) => {
    res.send('API is running..')
})

app.use('/blogapi/v1/blog', blogRoutes, limiter)
app.use('/blogapi/v1/user', userRoutes)

// HANDLING UNHANDLED ROUTES
app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server!!`, 404)); // anything pass on next it will automatic directed to the error middleware
});

app.use(globalErrorHandler) // error hanlder middleware

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))