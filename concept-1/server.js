// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Simple route for /hello
app.get('/hello', (req, res) => {
    res.send('Hello from Express server!');
});

app.get('/welcome', (req, res) => {
    const name = req.query.name || 'Guest';
    res.send(`Welcome, ${name}!`);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
