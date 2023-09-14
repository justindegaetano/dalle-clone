import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// Import a custom function to connect to the MongoDB database
import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Define routes for different parts of the application
app.use('/api/v1/post', postRoutes); // Routes related to posts
app.use('/api/v1/dalle', dalleRoutes); // Routes related to DALL-E

app.get('/', async (req, res) => {
    res.send('Hello from DALL-E');
});

// Define a function to start the server
const startServer = async () => {
  try {
    // Connect to the MongoDB database using the URL from environment variables
    connectDB(process.env.MONGODB_URL);

    // Start the Express server on port 8080 and log a message when it's started
    app.listen(8080, () => console.log('Server has started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
