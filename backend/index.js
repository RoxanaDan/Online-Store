const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://roxinicoleta2104:q2xKZ61YH7GVD8rU@cluster0.9wojvo1.mongodb.net/online-store")

// API Creation

app.get("/", (req, res) => {
    res.send("Express App is running")
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "./uploads/images",
    filename: (req, file, callback) => {
        return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port)
    } else {
        console.log("Error: " + error)
    }

})