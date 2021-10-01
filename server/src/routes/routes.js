const express = require ("express");
const router = express.Router();

// creating routes within an export function
module.exports = () => {
// Home Route
router.get("/", (req, res) => {
    res.send("Home Page")
})










return router
}