const mongoose = require('mongoose');

const EraSchema = new mongoose.Schema({
  id: String,
  env: String,
  items: Array
});

module.exports = mongoose.models.Era || mongoose.model('Era', EraSchema);