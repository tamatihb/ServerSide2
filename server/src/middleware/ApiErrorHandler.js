// Error Handling Middleware

    const ApiError = require('../utilities/ApiError');

    function apiErrorHandler(err, req, res, next) {
//Middleware checking for errors in one of the pre defined mehtods.
    if(err instanceof ApiError) {
        res.status(err.code).json(err.message);
        return;
    
// Middleware Catch-All: If it doesn't fall within a Pre-Defined Method, it passes to a General Error Message & Logs the Error Stack
     } else {
        console.error(err);
        res.status(500).json({
          message: 'Oh Oh Something went wrong - Please try again later'
        });
    }

    }

module.exports = apiErrorHandler;