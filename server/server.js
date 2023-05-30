const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require("cors")
require('dotenv').config()

const app = express();
app.use(cors())
const port = 3001;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
// Set up Multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog-app', // Specify the folder where you want to store the images in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png']
    }
});

const upload = multer({ storage });

// Handle POST request to upload image
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    // You can save the file details in your database or perform any other necessary operations here
    const file = req.file;
    console.log('Uploaded file:', file);

    res.send(file.path)
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});