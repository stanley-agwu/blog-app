const mongoose = require("mongoose")

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
    }
})

module.exports = mongoose.model("Blog", BlogSchema)