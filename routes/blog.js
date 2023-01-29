var express = require("express");
var router = express.Router();

const { isAuthenticated, getUserById } = require("../controllers/user");

const {
    getBlogById,
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
} = require("../controllers/blog");

//params
router.param("userId", getUserById);
router.param("blogId", getBlogById);


//routes

//create route
router.post(
    "/create/:userId",
    isAuthenticated,
    createBlog
);

//read routes
router.get("/all", getBlogs);

//update routes
router.put(
    "/:userId/:blogId",
    isAuthenticated,
    updateBlog
);

//delete routes
router.delete(
    "/:userId/:blogId",
    isAuthenticated,
    deleteBlog
);

module.exports = router;
