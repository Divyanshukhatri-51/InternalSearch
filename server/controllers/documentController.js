const Document = require('../models/Document');
const cloudinary = require('../config/cloudinary');

const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    // For UI filter options
    const categories = await Document.distinct('category');
    const fileTypes = await Document.distinct('type');
    const teams = await Document.distinct('team');
    res.json({
      documents,
      categories: categories.map(c => ({ name: c, count: documents.filter(d => d.category === c).length })),
      fileTypes: fileTypes.map(f => ({ name: f, count: documents.filter(d => d.type === f).length })),
      teams
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
};

const createDocument = async (req, res) => {
  try {
    let fileData = {};
    if (req.file) {
      const cloudUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto'
      });
      fileData = {
        fileUrl: cloudUpload.secure_url,
        fileType: cloudUpload.resource_type,
        cloudinaryId: cloudUpload.public_id
      };
    }
    const doc = new Document({
      ...req.body,
      formats: req.body.formats ? req.body.formats.split(',').map(f => f.trim()) : [],
      ...fileData
    });
    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    if (doc.cloudinaryId) {
      await cloudinary.uploader.destroy(doc.cloudinaryId, {
        resource_type: doc.fileType === 'video' ? 'video' : 'image'
      });
    }
    await doc.deleteOne();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = { getAllDocuments, createDocument, deleteDocument };
