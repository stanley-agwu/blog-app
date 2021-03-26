const Blog = require('../models/Blog')

//const blogs = require("./blogsData")

const allBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: "desc"})
    res.render("index", { blogs: blogs})
}
const newBlog = (req, res) =>{
    res.render("blogs/new", { blog: new Blog()})
}
const blog = async (req, res) =>{
    let blog = await Blog.findOne({ slug: req.params.slug })
    if (blog === null || !blog) res.redirect("/")
    res.render("blogs/blog", { blog: blog} )
}
const editBlog = async (req, res) =>{
    let blog = await Blog.findById(req.params.id)
    res.render("blogs/edit", { blog: blog })
}
createBlog = async (req, res) => {
    let blog = await new Blog({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        blog = await blog.save()
        res.redirect(`/blog/${blog.slug}`)
    } catch (error) {
        console.error(error)
        res.render("blogs/new", { blog: blog})
    }
}
const putBlog = async (req, res) => {
    let blog = await Blog.findById(req.params.id)
        blog.title = req.body.title
        blog.description = req.body.description,
        blog.markdown = req.body.markdown
    try {
        blog = await blog.save()
        res.redirect(`/blog/${blog.slug}`)
    } catch (error) {
        console.error(error)
        res.render("blogs/edit", { blog: blog})
    }
}
const deleteBlog = async (req, res) =>{
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect("/")
}
module.exports = {allBlogs, newBlog, blog, editBlog, createBlog, putBlog, deleteBlog}