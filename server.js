import express from 'express';
import emailRoutes from './app/routes/emailRoutes.js'

import cors from "cors";
// Initialize Express app
const app = express();


app.use(cors({
    origin: ['https://payapi-multipage-website.vercel.app', 'http://localhost:5173'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));


// Middleware to parse JSON data in the request body
app.use(express.json()); // For JSON payloads

// Middleware to parse URL-encoded data (optional)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to our API!',
    });
  });

app.use("/api", emailRoutes);


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});