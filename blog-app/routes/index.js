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
router.get("/blog/:id", async (req, res) =>{
    let blog = await Blog.findById(req.params.id)
    console.log(req.params)
    if (blog === null || !blog) res.redirect("/")
    res.render("blogs/blog", { blog: blog} )
})
router.get("/edit/:id", async (req, res) =>{
    let blog = await Blog.findById(req.params.id)
    res.render("blogs/edit", { blog: blog} )
})
router.post("/", async (req, res) => {
    let blog = await new Blog({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    console.log(req.body)
    try {
        blog = await blog.save()
        console.log(blog)
        res.redirect(`/blog/${blog.id}`)
    } catch (error) {
        console.error(error)
        res.redirect("/")
    }
})

module.exports = router