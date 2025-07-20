import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axios from 'axios';

const SimpleUploadContainer = styled.div`
  .upload-area {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    
    &:hover {
      border-color: #1890ff;
    }
  }
`;

const SimpleImageUpload = ({ value, onChange, placeholder = "Upload Image" }) => {
  const [uploading, setUploading] = useState(false);

  // Helper function to get the full image URL
  const getImageUrl = (url) => {
    if (!url) return '';
    // If it's already a full URL (Cloudinary), return as-is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // If it's a local path, prepend localhost
    return `http://localhost:10000${url}`;
  };

  const handleUpload = async (file) => {
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      console.log('Uploading file:', file.name);
      
      const response = await axios.post('http://localhost:10000/api/upload/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Upload response:', response.data);
      
      if (response.data.success) {
        onChange(response.data.imageUrl);
        message.success('Image uploaded successfully!');
      } else {
        message.error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      message.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
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
    
    handleUpload(file);
    return false; // Prevent default upload
  };

  return (
    <SimpleUploadContainer>
      {value ? (
        <div>
          <img 
            src={getImageUrl(value)} 
            alt="Preview" 
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '6px' }}
          />
          <br />
          <Button 
            size="small" 
            danger 
            onClick={() => onChange('')}
            style={{ marginTop: '8px' }}
          >
            Remove
          </Button>
        </div>
      ) : (
        <Upload
          beforeUpload={beforeUpload}
          showUploadList={false}
          accept="image/*"
        >
          <div className="upload-area">
            <UploadOutlined style={{ fontSize: '24px', marginBottom: '8px' }} />
            <div>{uploading ? 'Uploading...' : placeholder}</div>
          </div>
        </Upload>
      )}
    </SimpleUploadContainer>
  );
};

export default SimpleImageUpload;
