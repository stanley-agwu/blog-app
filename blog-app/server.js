const express = require("express")
const path = require("path")
const morgan = require("morgan")
const dotenv = require("dotenv")
const Router = require("./routes/index")
const connectDB = require("./config/db")

// Load config
dotenv.config({ path: "./config/config.env"})

// Load db
connectDB()

const app = express()

//Set View engine
app.set("view engine", "ejs")

//morgan
if (process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

//Body Parser
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

//routes
app.use("/", Router)

const PORT = process.env.PORT || 5000

app.listen(process.env.PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))