const User = require("../models/user")
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {

    const user = new User(req.body);
    // console.log(user);

    user.save((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: "Not able to save user in DB",
                error: err,
            });
        }

        return res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
    })

}

exports.signin = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User email dosn't exists",
            });
        }

        //validate for correct password
        if (!user.validPassword(password)) {
            return res.status(401).json({
                error: "Email and password dosn't match",
            });
        }

        //create token
        const token = jwt.sign({ _id: user._id }, "shhhh");

        //put token in cookie
        res.cookie("token", token, {
            expire: new Date(new Date()).getDate() + 9999,
        });

        //response send to frontend
        const { _id, name, email, role } = user;

        return res.json({
            token,
            user: { _id, name, email, role },
        });
    });
};

//sign-out the user by clearing the token from cookie
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signed-out succesfully",
    });
};

//authentication of user
exports.isAuthenticated = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {
            token = req.headers.authorization.split(" ")[1];

            //decode token id
            const decoded = jwt.verify(token, "shhhh");
            req.user = await User.findById(decoded._id).select("-encry_password");
            next();
        }

        catch (err) {
            console.log(err);
            return res.status(401).json({ message: "Invalid token" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }
};

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "No user found in DB" });
        }
        // console.log(user);
        req.profile = user;
        next();
    });
};