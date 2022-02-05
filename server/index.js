const PORT = process.env.PORT || 8000

// // Initialize Firebase
// require("./firebase")

// Initialize Express
const express = require("express")
const app = express()
const http = require("http").createServer(app)
var cors = require("cors")
app.use(cors())
app.use(express.json())