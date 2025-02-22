const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    try {
        const { title, body, author } = req.body;
        if (!title || !body || !author) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const blog = new Blog({ title, body, author });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        console.error("Blog Creation Error:", error);
        res.status(500).json({ error: 'Failed to create blog' });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Fetch Blogs Error:", error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        console.error("Fetch Blog By ID Error:", error);
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, body, author } = req.body;
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, body, author },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json(blog);
    } catch (error) {
        console.error("Update Blog Error:", error);
        res.status(500).json({ error: 'Failed to update blog' });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error("Delete Blog Error:", error);
        res.status(500).json({ error: 'Failed to delete blog' });
    }
};
