const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Ensure logs directory exists
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFile = fs.createWriteStream(path.join(logDir, 'app.log'), { flags: 'a' });

app.use((req, res, next) => {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    logFile.write(logMessage);
    next();
});

app.use(express.static('public'));

app.get('/api', (req, res) => {
    res.send({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
