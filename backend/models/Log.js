const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  symptoms: [String],
  phase: { type: String, default: "Luteal" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('log', LogSchema);