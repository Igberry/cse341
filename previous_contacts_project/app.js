const express = require('express');
const app = express();
const router = express.Router();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Web Server is listening at port ${port}`);
});
