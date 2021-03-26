const express = require("express")
const router = express.Router()

const { allBlogs, newBlog, blog, 
        editBlog, createBlog, putBlog, 
        deleteBlog } = require("../controllers/controllers")

router.get("/", allBlogs)

router.get("/new", newBlog)

router.get("/blog/:slug", blog)

router.get("/edit/:id", editBlog)

router.post("/", createBlog)

router.put("/:id", putBlog)

router.delete("/blog/:id", deleteBlog)

module.exports = router