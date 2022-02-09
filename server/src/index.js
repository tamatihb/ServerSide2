
// import core modules
    const express = require ("express");
    require("dotenv").config();
    const morgan = require ("morgan");
    const fileUpload = require('express-fileupload');
    
// start app using express
    const app = express();

//? import main routes
    const routes = require("./routes/routes");

//import custom modules
    const ApiError = require('./utilities/ApiError');
    const apiErrorHandler = require('./middleware/ApiErrorHandler');




// express middleware(returns middleware that parses JSON/urlencoded)
// .USE
// ("dev") outputs log of status code.
    app.use (morgan("dev"))
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

// ? file parsing middleware
    app.use(fileUpload());



//? All routes hit at
    app.use('/api', routes())

//? Not Found Route
    app.use((req, res, next) => {
    next(ApiError.notFound());
  });
  

//! Error Handler Middleware from our controller.
    app.use(apiErrorHandler);
  
app.use((req, res, next) => {
    next(ApiError.notFound());
})


// Server PORT
    const PORT = process.env.PORT || 5000;
    app.listen (
        PORT,
        ()=>console.log(`server is running fine and dandy on port =>${PORT}`)
    );
