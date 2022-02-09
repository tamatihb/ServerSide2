//import express and router
const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const restaurantRoutes = require("./restaurantRoutes");
const userRoutes = require("./userRoutes")


module.exports = () => {

    router.get('/', (req, res) => {
        res.send('Welcome to chefs hat')

    });


    // SUB ROUTES
    router.use('/restaurant', restaurantRoutes())
    router.use('/auth', authRoutes())
    router.get('/user', userRoutes())
    return router
}