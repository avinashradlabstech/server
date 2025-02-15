import express from 'express';
import cors from 'cors';
import emailRoutes from './app/routes/emailRoutes.js';

const app = express();
const port = process.env.PORT || 3000; // Ensure the app runs on a port

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors({
    origin: ['https://payapi-multipage-website.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// API Routes
app.use("/api", emailRoutes);

// Default Route (Optional)
app.get("/", (req, res) => {
    res.send("Welcome to my Node.js API on Render!");
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
