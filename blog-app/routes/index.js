const express = require("express")
const router = express.Router()

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
    res.render("blogs/show", { blog: blog} )
})
router.get("/edit/:id", async (req, res) =>{
    let blog = await Blog.findById(req.params.id)
    res.render("blogs/edit", { blog: blog} )
})

module.exports = router