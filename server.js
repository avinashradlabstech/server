import express from 'express';
import emailRoutes from './app/routes/emailRoute.js'

const allowedOrigins = [
    'https://payapi-multipage-website.vercel.app',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
};


// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Email routes
app.use("/api", emailRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});