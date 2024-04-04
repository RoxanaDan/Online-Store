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

const upload = multer({ storage: storage })

// Creating Upload Endpoint for images
app.use('/images', express.static('uploads/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        imageUrl: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating products 
const Product = mongoose.model("Prodct", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
})

app.post('/add-product', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    })
    console.log(product);
    await product.save();
    console.log('saved');
    res.json({
        succes: true,
        name: req.body.name
    })
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port)
    } else {
        console.log("Error: " + error)
    }

})