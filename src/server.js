const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); 
const Era = require('./models/era');   

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Frontend
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/api/eras/:id', async (req, res) => {
  try {
    const era = await Era.findOne({ id: req.params.id });
    if (!era) return res.status(404).json({ error: 'Not found' });
    res.json(era);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));