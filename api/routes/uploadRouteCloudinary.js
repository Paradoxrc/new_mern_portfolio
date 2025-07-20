const express = require("express");
const router = express.Router();
const { upload, cloudinary } = require("../middleware/cloudinaryUpload");

// Upload single image to Cloudinary
router.post('/single', (req, res) => {
  console.log('Single upload endpoint hit');
  
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer/Cloudinary error:', err);
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

      console.log('File uploaded successfully to Cloudinary:', req.file.filename);
      
      res.status(200).json({
        success: true,
        message: 'File uploaded successfully to Cloudinary',
        imageUrl: req.file.path, // Cloudinary URL
        publicId: req.file.filename, // Cloudinary public ID
        cloudinaryData: {
          url: req.file.path,
          secure_url: req.file.path,
          public_id: req.file.filename
        }
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

// Upload multiple images to Cloudinary
router.post('/multiple', (req, res) => {
  upload.array('images', 10)(req, res, (err) => {
    if (err) {
      console.error('Multiple upload error:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'Upload failed'
      });
    }
    
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No files uploaded'
        });
      }

      const uploadedFiles = req.files.map(file => ({
        imageUrl: file.path,
        publicId: file.filename
      }));

      console.log(`${req.files.length} files uploaded successfully to Cloudinary`);
      
      res.status(200).json({
        success: true,
        message: 'Files uploaded successfully to Cloudinary',
        images: uploadedFiles
      });
    } catch (error) {
      console.error('Multiple upload processing error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process uploads',
        error: error.message
      });
    }
  });
});

// Delete image from Cloudinary
router.delete('/:publicId(*)', async (req, res) => {
  try {
    let publicId = req.params.publicId;
    
    // Handle URL-encoded slashes in publicId (portfolio/filename)
    publicId = decodeURIComponent(publicId);
    
    console.log('Attempting to delete Cloudinary image with publicId:', publicId);
    
    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    
    console.log('Cloudinary delete result:', result);
    
    if (result.result === 'ok') {
      res.status(200).json({
        success: true,
        message: 'Image deleted successfully from Cloudinary'
      });
    } else if (result.result === 'not found') {
      res.status(404).json({
        success: false,
        message: 'Image not found in Cloudinary'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to delete image from Cloudinary',
        result: result
      });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image',
      error: error.message
    });
  }
});

// List all images in portfolio folder
router.get('/list', async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression('folder:portfolio')
      .sort_by([['created_at', 'desc']])
      .max_results(100)
      .execute();

    res.status(200).json({
      success: true,
      images: result.resources.map(resource => ({
        publicId: resource.public_id,
        url: resource.secure_url,
        createdAt: resource.created_at
      }))
    });
  } catch (error) {
    console.error('List images error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list images',
      error: error.message
    });
  }
});

// Test endpoint to check Cloudinary configuration
router.get('/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Cloudinary upload service is working!',
    cloudinaryConfig: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      configured: !!cloudinary.config().cloud_name
    }
  });
});

module.exports = router;
