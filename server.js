require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. MIDDLEWARE ---
app.use(cors()); // Allow requests
app.use(express.json());
// Serve the frontend files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// --- 2. DATABASE CONNECTION ---
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// --- 3. DATA MODEL (SCHEMA) ---
const ItemSchema = new mongoose.Schema({
  name: String,
  info: String
});

const EraSchema = new mongoose.Schema({
  id: String,
  env: String,
  items: [ItemSchema]
});

const Era = mongoose.model('Era', EraSchema);

// --- 4. API ROUTES ---

// GET: Fetch specific Era data
app.get('/api/eras/:id', async (req, res) => {
  try {
    const era = await Era.findOne({ id: req.params.id });
    if (!era) return res.status(404).json({ error: 'Era not found' });
    res.json(era);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 5. START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});