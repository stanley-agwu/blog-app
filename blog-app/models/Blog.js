const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Blog", BlogSchema)