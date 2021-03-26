const mongoose = require("mongoose")
const marked = require('marked')
const slugify = require('slugify')
const createDomPurifier = require("dompurify")
const { JSDOM } = require("jsdom")

const window = new JSDOM("").window
const DOMPurifier = createDomPurifier(window)


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
    },
    sanitizedHtml: {
        type: String,
    }
})

BlogSchema.pre("validate", function(next){
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    if (this.markdown){
        this.sanitizedHtml = DOMPurifier.sanitize(marked(this.markdown))
    }
    next()
})


module.exports = mongoose.model("Blog", BlogSchema)