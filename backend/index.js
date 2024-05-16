const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require('bcrypt');

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
const Product = mongoose.model("Product", {
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
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;

    }
    else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    })
    await product.save();
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating API for deleting products
app.post('/remove-product', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating API for getting all products
app.get('/all-products', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
})

// Schema for creating User Model
const User = mongoose.model('User', {
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// Endpoint for user register
app.post('/sign-up', async (req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        res.status(400).json({ success: false, errors: "An account with this email already exists" })
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;

    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        cartData: cart
    })

    try {
        await user.save();
        const token = jwt.sign({ user: { id: user._id } }, 'secret_key');
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create account" });
    }
})

// Endpoint for user login
app.post('/login', async (req, res) => {
    let user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(404).json({ success: false, errors: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ success: false, errors: "Incorrect password" });
    }

    const token = jwt.sign({ user: { id: user._id } }, 'secret_key');
    res.json({ success: true, token });
})


//Endpoint for new collection data
app.get('/new-collections', async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    res.send(newCollection);
})

//Endpoint for popular in women
app.get('/popular-in-women', async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popularInWomen = products.slice(0, 4);
    res.send(popularInWomen);
})

//Create middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" })
    }

    else {
        try {
            const data = jwt.verify(token, 'secret_key');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using a valid token" })
        }
    }
}

//Endpoint for adding products in cart
app.post('/add-to-cart', fetchUser, async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    if (!userData.cartData) {
        userData.cartData = {}; // Initialize cartData if it's undefined
    }
    userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
})

//Endpoint to remove product from cart
app.post('/remove-from-cart', fetchUser, async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.user.id });
        if (!userData) {
            return res.status(404).send("User not found");
        }

        // Ensure cartData exists before accessing it
        if (!userData.cartData) {
            userData.cartData = {};
        }

        const itemId = req.body.itemId;

        // Check if the item exists in the cart before decrementing its quantity
        if (userData.cartData[itemId] && userData.cartData[itemId] > 0) {
            userData.cartData[itemId] -= 1;
        } else {
            return res.status(400).send("Item not found in the cart");
        }

        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed");
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

//Endpoint to get cartdata
app.post('/get-cart', fetchUser, async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port)
    } else {
        console.log("Error: " + error)
    }

})