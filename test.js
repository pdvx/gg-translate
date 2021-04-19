const { createServer } = require('http');
const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 3001;
const app = express();



const server = createServer(app);
server.listen(port, () => {
  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`);
});
