
const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  clickCount: { type: Number, default: 0 },
  clickHistory: { type: Array, default: [] },
}, { timestamps: true });

module.exports = mongoose.model('urls', UrlSchema);
