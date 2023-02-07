// Vaibhav Guliani
//101336421
//Assignment01

require("dotenv").config();
const router = require("express").Router();
const UserModel = require("../models/UserModel");

router.get("/", async (req, res) => {
    // Using if else loop
    if (!req.cookies || !req.cookies.username) {
        return res.redirect("/login");
    }

    try {
        let user = await UserModel.findOne({ username: req.cookies.username });
        if (!user) {
            return res.redirect("/login");
        } else {
            res.render("index", { user });
        }
    } catch (err) {
        return res.redirect("/login");
    }
});
//Connecting login page
router.get("/login", (req, res) => {
    res.render("login");
});
//Connecting sign up page
router.get("/sign_up", (req, res) => {
    res.render("sign_up");
});
//Connecting sign out page
router.get("/signout", async (req, res) => {
    return res.clearCookie("username").redirect("/login");
});
//Connecting chat room page
router.get("/chat_room", (req, res) => {
    if (!req.cookies || !req.cookies.username) {
        return res.redirect("/login");
    }

    res.render("chat_room");
});

module.exports = router;