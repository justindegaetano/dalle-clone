import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Import the Post model from a MongoDB file
import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle GET requests to the root URL ('/'), retrieves all posts
router.route('/').get(async (req, res) => {
  try {
    // Retrieve all posts from the database
    const posts = await Post.find({});
    
    // Send a successful response with the retrieved data
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    // Handle any errors and send a 500 (Internal Server Error) response
    res.status(500).json({ success: false, message: err });
  }
});

// Handle POST requests to the root URL ('/'), creates a new post
router.route('/').post(async (req, res) => {
  try {
    // Extract relevant data (name, prompt, and photo) from the request body
    const { name, prompt, photo } = req.body;
    
    // Upload the photo to Cloudinary and retrieve the photo URL
    const photoUrl = await cloudinary.uploader.upload(photo);
    
    // Create a new post in the database with the extracted data and photo URL
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
  
    // Send a successful response with the newly created post data
    res.status(200).json({ success: true, data: newPost });      
  } catch (err) {
    // Handle any errors and send a 500 (Internal Server Error) response
    res.status(500).json({ success: false, message: 'Unable to create post, please try again' });
  }
});

// Export the router for use in other parts of the application
export default router;
