import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json()); // Add this line to parse JSON bodies

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.static(path.join(__dirname, '../frontend/components')));

// Handle login request
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Replace this with your actual authentication logic
  if (username === 'admin' && password === 'password') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/components/login/login.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
