// import core modules
const express = require ("express");
require("dotenv").config();
// start app using express
const app = express();
// import main routes
const routes = require("./routes/routes")


// express middleware(returns middleware that parses JSON/urlencoded)
// .use
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// All routes hit at
app.use('/api', routes())







// Server PORT
const PORT = process.env.PORT || 3000;
app.listen (
    PORT,
    ()=>console.log(`server is running fine and dandy on port: ${PORT}`)
);
