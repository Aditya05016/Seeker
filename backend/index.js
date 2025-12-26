const express = require('express');
const dotenv = require('dotenv'); // import ki jagah require use karein

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("this is home page");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});