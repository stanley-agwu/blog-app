const express = require("express")
const router = express.Router()
const Blog = require('../models/Blog')

//const blogs = require("./blogsData")

router.get("/", async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: "desc"})
    res.render("index", { blogs: blogs})
})
router.get("/new", (req, res) =>{
    res.render("blogs/new", { blog: new Blog()})
})
router.get("/blog/:slug", async (req, res) =>{
    let blog = await Blog.findOne({ slug: req.params.slug })
    if (blog === null || !blog) res.redirect("/")
    res.render("blogs/blog", { blog: blog} )
})
router.get("/edit/:id", async (req, res) =>{
    let blog = await Blog.findById(req.params.id)
    res.render("blogs/edit", { blog: blog })
})
router.post("/", async (req, res) => {
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
})
router.put("/:id", async (req, res) => {
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
})
router.delete("/blog/:id", async (req, res) =>{
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect("/")
})


module.exports = router