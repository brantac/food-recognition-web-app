const express = require('express');
const app = express();
const port = 3000;

// Get the routes

// Set ups

// Config
app.use(compression());

// Use the routes
app.get('/', function (req, res) {
    res.send('Hello world!');
});

// Define the port that the server will listen
app.listen('3000', function () {
    console.log(`Model server running on http://localhost:${port}`);
});