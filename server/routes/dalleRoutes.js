import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

// Create an instance of the OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use the API key from environment variables
});

// Define a route to handle POST requests
router.route('/').post(async (req, res) => {
  try {
    // Extract the 'prompt' field from the request body
    const { prompt } = req.body;

    // Generate an image using the OpenAI API with specified parameters
    const response = await openai.images.generate({
      prompt,
      n: 1, // Generate one image
      size: '1024x1024', // Specify the image size
      response_format: 'b64_json', // Receive the response in base64 JSON format
    });

    // Extract the base64 image data from the response
    const image = response.data[0].b64_json;
    
    // Send a successful response with the generated image
    res.status(200).json({ photo: image });
  } catch (err) {
    console.error(err);
    res.status(500).send(err?.response.data.error.message);
  }
});

export default router;
