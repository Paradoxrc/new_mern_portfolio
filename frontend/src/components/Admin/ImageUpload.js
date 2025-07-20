import React, { useState } from 'react';
import { Upload, Button, message, Modal, Image, Progress } from 'antd';
import { UploadOutlined, DeleteOutlined, EyeOutlined, PictureOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axios from 'axios';

const UploadContainer = styled.div`
  .ant-upload-list-item {
    border-radius: 8px;
  }
  
  .image-preview {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    padding: 12px;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    background: #fafafa;
  }
  
  .preview-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid #e5e7eb;
  }
  
  .preview-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .preview-name {
    font-weight: 500;
    color: #374151;
  }
  
  .preview-url {
    font-size: 12px;
    color: #6b7280;
    word-break: break-all;
  }
  
  .preview-actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  .upload-button {
    width: 100%;
    height: 100px;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #fafafa;
    
    &:hover {
      border-color: #667eea;
      background: #f8fafc;
    }
    
    &.uploading {
      border-color: #667eea;
      background: #f0f4ff;
    }
  }
  
  .upload-icon {
    font-size: 24px;
    color: #9ca3af;
    margin-bottom: 8px;
  }
  
  .upload-text {
    color: #6b7280;
    font-size: 14px;
  }
`;

const ImageUpload = ({ 
  value, 
  onChange, 
  multiple = false, 
  accept = "image/*",
  placeholder = "Click or drag to upload image",
  maxCount = 1
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  // Helper function to get the full image URL
  const getImageUrl = (url) => {
    if (!url) return '';
    // If it's already a full URL (Cloudinary), return as-is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // If it's a local path, prepend production URL (with localhost as fallback in comments)
    // Production: https://newww-mern-portfolio-backend.onrender.com
    // Fallback: http://localhost:10000
    return `https://newww-mern-portfolio-backend.onrender.com${url}`;
  };

  const uploadImage = async (file) => {
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      
      if (multiple) {
        formData.append('images', file);
        
        // Try production server first, fallback to localhost if it fails
        let response;
        try {
          response = await axios.post('https://newww-mern-portfolio-backend.onrender.com/api/upload/multiple', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted);
            }
          });
        } catch (primaryError) {
          console.warn('Production upload failed, trying localhost fallback...');
          response = await axios.post('http://localhost:10000/api/upload/multiple', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted);
            }
          });
        }
        
        if (response.data.success) {
          const newImages = [...(value || []), ...response.data.images.map(img => img.url)];
          onChange(newImages);
          message.success('Images uploaded successfully!');
        }
      } else {
        formData.append('image', file);
        
        // Try production server first, fallback to localhost if it fails
        let response;
        try {
          response = await axios.post('https://newww-mern-portfolio-backend.onrender.com/api/upload/single', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        });
        } catch (primaryError) {
          console.warn('Production upload failed, trying localhost fallback...');
          response = await axios.post('http://localhost:10000/api/upload/single', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        });
        }
        
        if (response.data.success) {
          onChange(response.data.imageUrl);
          message.success('Image uploaded successfully!');
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      message.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteImage = async (imageUrl, index) => {
    try {
      // For external URLs (not on our server), just remove from UI
      if (imageUrl.startsWith('http') && !imageUrl.includes('localhost') && !imageUrl.includes('cloudinary')) {
        if (multiple) {
          const newImages = value.filter((_, i) => i !== index);
          onChange(newImages);
        } else {
          onChange('');
        }
        message.success('Image removed successfully');
        return;
      }

      // For Cloudinary URLs, extract public_id and delete from Cloudinary
      if (imageUrl.includes('cloudinary.com')) {
        try {
          // Extract public_id from Cloudinary URL
          // URL format: https://res.cloudinary.com/cloud_name/image/upload/v123456789/folder/public_id.ext
          const urlParts = imageUrl.split('/');
          const fileWithExt = urlParts[urlParts.length - 1];
          const folder = urlParts[urlParts.length - 2];
          const publicId = `${folder}/${fileWithExt.split('.')[0]}`; // Remove extension
          
          await axios.delete(`http://localhost:10000/api/upload/${publicId}`);
        } catch (error) {
          console.warn('Failed to delete from Cloudinary, removing from UI only:', error.message);
        }
        
        if (multiple) {
          const newImages = value.filter((_, i) => i !== index);
          onChange(newImages);
        } else {
          onChange('');
        }
        message.success('Image deleted successfully');
        return;
      }

      // For local images (legacy)
      const filename = imageUrl.split('/').pop();
      await axios.delete(`http://localhost:10000/api/upload/${filename}`);
      
      if (multiple) {
        const newImages = value.filter((_, i) => i !== index);
        onChange(newImages);
      } else {
        onChange('');
      }
      
      message.success('Image deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      
      // Fallback: Remove from UI even if server delete fails
      if (multiple) {
        const newImages = value.filter((_, i) => i !== index);
        onChange(newImages);
      } else {
        onChange('');
      }
      
      message.success('Image removed from form (server deletion may have failed)');
    }
  };

  const handlePreview = (imageUrl, title = 'Image Preview') => {
    setPreviewImage(imageUrl);
    setPreviewTitle(title);
    setPreviewVisible(true);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return false;
    }
    
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB!');
      return false;
    }
    
    // Upload the file
    uploadImage(file);
    return false; // Prevent automatic upload
  };

  const uploadProps = {
    beforeUpload,
    showUploadList: false,
    accept,
    multiple,
  };

  // For single image upload
  if (!multiple) {
    return (
      <UploadContainer>
        {value ? (
          <div className="image-preview">
            <img src={getImageUrl(value)} alt="Preview" className="preview-image" />
            <div className="preview-info">
              <div className="preview-name">Uploaded Image</div>
              <div className="preview-url">{value}</div>
            </div>
            <div className="preview-actions">
              <Button 
                size="small" 
                icon={<EyeOutlined />} 
                onClick={() => handlePreview(getImageUrl(value), 'Image Preview')} 
              />
              <Button 
                size="small" 
                icon={<DeleteOutlined />} 
                danger 
                onClick={() => deleteImage(value)} 
                title="Remove image"
              />
            </div>
          </div>
        ) : (
          <Upload {...uploadProps}>
            <div className={`upload-button ${uploading ? 'uploading' : ''}`}>
              {uploading ? (
                <>
                  <Progress 
                    type="circle" 
                    percent={uploadProgress} 
                    size={40}
                    strokeColor="#667eea"
                  />
                  <div className="upload-text">Uploading...</div>
                </>
              ) : (
                <>
                  <PictureOutlined className="upload-icon" />
                  <div className="upload-text">{placeholder}</div>
                </>
              )}
            </div>
          </Upload>
        )}

        <Modal
          open={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
          width="80%"
          style={{ maxWidth: 800 }}
        >
          <Image 
            src={previewImage} 
            style={{ width: '100%' }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
          />
        </Modal>
      </UploadContainer>
    );
  }

  // For multiple images upload
  return (
    <UploadContainer>
      <Upload {...uploadProps}>
        <div className={`upload-button ${uploading ? 'uploading' : ''}`}>
          {uploading ? (
            <>
              <Progress 
                type="circle" 
                percent={uploadProgress} 
                size={40}
                strokeColor="#667eea"
              />
              <div className="upload-text">Uploading...</div>
            </>
          ) : (
            <>
              <PictureOutlined className="upload-icon" />
              <div className="upload-text">{placeholder}</div>
            </>
          )}
        </div>
      </Upload>

      {value && value.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {value.map((imageUrl, index) => (
            <div key={index} className="image-preview" style={{ marginBottom: 12 }}>
              <img src={getImageUrl(imageUrl)} alt={`Preview ${index}`} className="preview-image" />
              <div className="preview-info">
                <div className="preview-name">Image {index + 1}</div>
                <div className="preview-url">{imageUrl}</div>
              </div>
              <div className="preview-actions">
                <Button 
                  size="small" 
                  icon={<EyeOutlined />} 
                  onClick={() => handlePreview(getImageUrl(imageUrl), `Image ${index + 1}`)} 
                />
                <Button 
                  size="small" 
                  icon={<DeleteOutlined />} 
                  danger 
                  onClick={() => deleteImage(imageUrl, index)} 
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="80%"
        style={{ maxWidth: 800 }}
      >
        <Image 
          src={previewImage} 
          style={{ width: '100%' }}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
        />
      </Modal>
    </UploadContainer>
  );
};

export default ImageUpload;
