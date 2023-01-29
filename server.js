const express = require('express');
const app = express();

const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');


const cors = require("cors");
app.use(cors())
const bodyParser = require("body-parser");
app.use(bodyParser.json())
const cookieParser = require("cookie-parser");
app.use(cookieParser())


mongoose.connect("mongodb://localhost:27017/blogPost").then(() => {
    console.log("Database connected");
})

app.get("/", (req, res) => {
    res.send("Hello Welcome to the blog post backend, Regards Geetansh Agrawal")
})

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

app.listen(5005, () => {
    console.log("---------------------------");
    console.log("Backend running on port 5005");
    console.log("---------------------------");
})
