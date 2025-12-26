const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const videoRoutes = require('./routes/videoRoutes'); // 1. Routes ko import karein

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

// 2. Routes ko mount karein
app.use('/api/videos', videoRoutes); 

app.get('/', (req, res) => {
    res.send("this is home page");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});