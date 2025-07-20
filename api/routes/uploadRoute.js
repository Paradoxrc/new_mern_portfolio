const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const path = require('path');
const fs = require('fs');

// Test endpoint
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Upload route is working',
    timestamp: new Date().toISOString()
  });
});

// Upload single image
router.post('/single', (req, res) => {
  console.log('Single upload endpoint hit');
  
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'Upload failed',
        error: err
      });
    }
    
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      
      console.log('File uploaded successfully:', req.file.filename);
      
      res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        imageUrl: imageUrl,
        filename: req.file.filename
      });
    } catch (error) {
      console.error('Upload processing error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process upload',
        error: error.message
      });
    }
  });
});

// Upload multiple images
router.post('/multiple', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const imageUrls = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename
    }));
    
    console.log('Files uploaded:', req.files.map(f => f.filename));
    
    res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      images: imageUrls
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload files',
      error: error.message
    });
  }
});

// Delete image
router.delete('/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('File deleted:', filename);
      res.status(200).json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: error.message
    });
  }
});

// Get all uploaded images
router.get('/list', (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      return res.status(200).json({
        success: true,
        images: []
      });
    }

    const files = fs.readdirSync(uploadsDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext);
    });

    const images = imageFiles.map(file => ({
      filename: file,
      url: `/uploads/${file}`,
      uploadDate: fs.statSync(path.join(uploadsDir, file)).mtime
    }));

    res.status(200).json({
      success: true,
      images: images
    });
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list files',
      error: error.message
    });
  }
});

module.exports = router;
