const mongoose = require("mongoose")
const marked = require('marked')
const slugify = require('slugify')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    markdown: {
        type: String
    },
    slug: {
        type: String,
        unique: true
    }
})

BlogSchema.pre("validate", function(next){
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
})

module.exports = mongoose.model("Blog", BlogSchema)