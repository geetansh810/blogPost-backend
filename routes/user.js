var express = require("express");
var router = express.Router();

//used for input validation
const { check } = require("express-validator");

const { signout, signup, signin } = require("../controllers/user");

//for registering new user
router.post(
    "/signup",
    [
        check("name", "Minimum length of name should be 3").isLength({
            min: 3,
        }),
        check("password", "Minimum length of password should be 8").isLength({
            min: 8,
        }),
        check("email", "Enter the correct form of email").isEmail(),
    ],
    signup
);

//for sign-in a user
router.post(
    "/signin",
    [
        check("password", "Password is required").isLength({
            min: 8,
        }),
        check("email", "Email is required").isEmail(),
    ],
    signin
);

//to sign-out the user
router.get("/signout", signout);

module.exports = router;
