const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Get the routes
const home = require('./routes/home');

// Set ups

// Config
// app.use(compression());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Use the routes
app.use('/', home);
// }); Criar rota de login

// Define the port that the server will listen
app.listen('3000', function () {
    console.log(`Model server running on http://localhost:${port}`);
});

module.exports = app;