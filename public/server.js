const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware to parse URL-encoded bodies
server.use(express.urlencoded({ extended: true }));

// Logger middleware for request details
server.use(logger('dev'));

// Route to generate a random number
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// POST route for handling mad lib form submissions
server.post('/submit', (req, res) => {
  const { noun, verb, adjective, adverb, name } = req.body;
  if (!noun || !verb || !adjective || !adverb || !name) {
    return res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields.</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
  }
  const madLib = `Once upon a time, a ${adjective} ${noun} named ${name} loved to ${verb} ${adverb}.`;
  res.send(`
      <h1>Submission Successful</h1>
      <p>${madLib}</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
  `);
});

// Serve static files from the 'public' directory
const publicFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicFilesPath));

// Listen on the port provided by Azure, or fallback to 8080 locally.
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
