import cors from 'cors'
import express from 'express';
import dotenv from 'dotenv'

import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

import { checkAccess } from './middlewares/authMiddleware.mjs'
import { livestream } from './livestream.mjs'

// Set __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config()

// Simulate live stream
livestream();

// Create the server
const app = express();
app.use(cors())
app.get('/:filename', checkAccess, (req, res) => {
  const filename = req.params.filename;
  console.log('filename', filename)
  let filepath = path.join('videos', filename);
  filepath = path.join(__dirname, filepath);
  if (fs.existsSync(filepath)) {
    
    res.sendFile(filepath);
  } else {
    console.log('File not found')
    res.status(404).send('File not found');
  }
});

// Start the server
const port = process.env.PORT ?? 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});