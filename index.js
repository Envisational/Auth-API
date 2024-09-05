const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/API', (req, res) => {
    res.send("API is running!");
});

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
});

