const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
