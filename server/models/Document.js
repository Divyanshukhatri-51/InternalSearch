const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: String,
  type: { type: String, required: true },
  tag: String,
  category: String,
  formats: [String],
  team: String,
  fileUrl: String,
  fileType: String,
  cloudinaryId: String,
  createdAt: { type: Date, default: Date.now }
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
