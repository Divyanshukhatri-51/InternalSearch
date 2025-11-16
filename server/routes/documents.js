const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {
  getAllDocuments,
  createDocument,
  deleteDocument
} = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllDocuments);
router.post('/', authMiddleware, upload.single('file'), createDocument);
router.delete('/:id', authMiddleware, deleteDocument);
module.exports = router;
