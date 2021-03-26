const express = require("express")
const router = express.Router()

const { allBlogs, newBlog, blog, 
        editBlog, createBlog, putBlog, 
        deleteBlog, createAndEditBlog } = require("../controllers/controllers")

router.get("/", allBlogs)

router.get("/new", newBlog)

router.get("/blog/:slug", blog)

router.get("/edit/:id", editBlog)

router.post("/", createBlog, createAndEditBlog("new"))

router.put("/:id", putBlog, createAndEditBlog("edit"))

router.delete("/blog/:id", deleteBlog)

module.exports = router