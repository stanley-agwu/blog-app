const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const dotenv = require("dotenv")
const Router = require("./routes/index")
const connectDB = require("./config/db")
const methodOverride = require("method-override")


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

//Method Override to Form
app.use(methodOverride("_method"))

//Body Parser
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use("/", Router)

const PORT = process.env.PORT || 5000

app.listen(process.env.PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))