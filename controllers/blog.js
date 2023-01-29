const Blog = require("../models/blog");

exports.getBlogs = (req, res) => {

    Blog.find().exec((err, blogs) => {
        if (err || !blogs) {
            return res.status(400).json({
                error: "No blog found in DB",
            });
        }

        const pageCount = Math.ceil(blogs.length / 10);
        let page = parseInt(req.query.page);
        if (!page) { page = 1; }
        if (page > pageCount) {
            page = pageCount
        }
        res.json({
            "page": page,
            "pageCount": pageCount,
            "blogs": blogs.slice(page * 10 - 10, page * 10)
        });

    });
}

exports.getBlogById = (req, res, next, id) => {
    Blog.findById(id).exec((err, blog) => {
        if (err || !blog) {
            return res.status(400).json({
                error: "Blog not found in DB",
            });
        }
        req.blog = blog;
        next()
    });
};

exports.createBlog = (req, res) => {
    const blog = new Blog(req.body);
    blog.save((err, blog) => {
        if (err || !blog) {
            return res.status(400).json({
                error: "Not able to save blog in DB",
            });
        }
        res.json(blog);
    });
};

exports.updateBlog = (req, res) => {
    const blog = req.blog;
    blog.title = req.body.title;
    blog.description = req.body.description;

    console.log(blog);

    Blog.findByIdAndUpdate({ _id: blog._id }, blog, (err, updatedBlog) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to update blog in DB",
            });
        }

        return res.json({
            message: "Blog updated"
        })
    })
};

exports.deleteBlog = (req, res) => {
    const blog = req.blog;

    blog.remove((err, deletedBlog) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete this blog in DB",
            });
        }
        res.json({
            message: `${deletedBlog.title} - blog is deleted successfully`,
        });
    });
};