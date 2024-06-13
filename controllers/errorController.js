const AppError = require("../utils/appError");
// ERRORS DURING DEVELOPMENT AND PRODUCTION

const sendErrorDev = (err, req, res) => {
    //API
    if(req.originalUrl.startsWith('/taskapi/v1')){
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } 
};

const sendErrorProd = (err, req, res) => {
    // 1. API
    if(req.originalUrl.startsWith('/taskapi/v1')){
        // Operational, trusted error: send message to client
        if(err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } 
            // log error
            // console.error('ERROR', err);
    
            // send error meassage
            return res.status(500).json({
                status: 'Error',
                message: 'Something went wrong!!'
            });
    }
        // 2. Send generic message
        return res.status(500).json({
            status: 'Error',
            message: 'Please try again later.'
        });
};

const globalErrorHandler = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;

        sendErrorProd(error, req, res);
    };

    // If the error is an instance of AppError, handle it accordingly
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    // For any other errors, send a generic message
    res.status(500).json({
        status: 'ERROR',
        message: 'Something went wrong!',
    });
};

module.exports = globalErrorHandler