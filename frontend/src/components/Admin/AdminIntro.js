import React, { useEffect } from 'react';
import { Form, Input, message, Button, Card, Space, Typography, Divider } from 'antd';
import { SaveOutlined, UserOutlined, LinkOutlined, MailOutlined, PhoneOutlined, HomeOutlined, PictureOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/rootSlice';
import axios from 'axios';
import styled from 'styled-components';
import ImageUpload from './ImageUpload';

const { Title, Text } = Typography;
const { TextArea } = Input;

const AdminIntro = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();

  useEffect(() => {
    if (portfolioData?.intro) {
      form.setFieldsValue(portfolioData.intro);
    }
  }, [portfolioData, form]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      // Try production server first, fallback to localhost if it fails
      let response;
      try {
        response = await axios.post('https://dinith-edirisinghe.onrender.com/api/portfolio/update-intro', {
          ...values,
          _id: portfolioData.intro._id,
        });
      } catch (primaryError) {
        console.warn('Production server failed, trying localhost fallback...');
        response = await axios.post('http://localhost:10000/api/portfolio/update-intro', {
          ...values,
          _id: portfolioData.intro._id,
        });
      }
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <FormContainer>
      <Title level={2} style={{ marginBottom: 24, color: '#1f2937' }}>
        Personal Information
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Update your personal information and social links
      </Text>

      <Form form={form} onFinish={onFinish} layout="vertical" size="large">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Basic Information */}
          <StyledCard title="Basic Information" extra={<UserOutlined />}>
            <Form.Item 
              name="profileImage" 
              label="Profile Picture"
            >
              <ImageUpload
                value={form.getFieldValue('profileImage')}
                onChange={(url) => form.setFieldsValue({ profileImage: url })}
                placeholder="Upload your profile picture"
              />
            </Form.Item>

            <Divider />

            <Form.Item 
              name="name" 
              label="Full Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Enter your full name" 
              />
            </Form.Item>

            <Form.Item 
              name="roles" 
              label="Professional Roles"
              rules={[{ required: true, message: 'Please enter your roles' }]}
            >
              <Input 
                placeholder="e.g., Full Stack Developer, UI/UX Designer" 
              />
            </Form.Item>

            <Form.Item 
              name="description" 
              label="About Me"
              rules={[{ required: true, message: 'Please enter your description' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="Tell us about yourself and your expertise..." 
              />
            </Form.Item>
          </StyledCard>

          {/* Contact Information */}
          <StyledCard title="Contact Information" extra={<MailOutlined />}>
            <Form.Item 
              name="email" 
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="your.email@example.com" 
              />
            </Form.Item>

            <Form.Item 
              name="phone" 
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input 
                prefix={<PhoneOutlined />} 
                placeholder="+1 (555) 123-4567" 
              />
            </Form.Item>

            <Form.Item 
              name="address" 
              label="Address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input 
                prefix={<HomeOutlined />} 
                placeholder="Your city, country" 
              />
            </Form.Item>
          </StyledCard>

          {/* Professional Links */}
          <StyledCard title="Professional Links" extra={<LinkOutlined />}>
            <Form.Item 
              name="resume" 
              label="Resume URL"
              rules={[
                { required: true, message: 'Please enter your resume URL' },
                { type: 'url', message: 'Please enter a valid URL' }
              ]}
            >
              <Input 
                prefix={<LinkOutlined />} 
                placeholder="https://your-resume-link.com" 
              />
            </Form.Item>

            <Form.Item 
              name="github" 
              label="GitHub Profile"
              rules={[
                { required: true, message: 'Please enter your GitHub URL' },
                { type: 'url', message: 'Please enter a valid URL' }
              ]}
            >
              <Input 
                prefix="🐙" 
                placeholder="https://github.com/username" 
              />
            </Form.Item>

            <Form.Item 
              name="linkedin" 
              label="LinkedIn Profile"
              rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
            >
              <Input 
                prefix="💼" 
                placeholder="https://linkedin.com/in/username" 
              />
            </Form.Item>

            <Form.Item 
              name="youtube" 
              label="YouTube Channel"
              rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
            >
              <Input 
                prefix="📺" 
                placeholder="https://youtube.com/@username" 
              />
            </Form.Item>

            <Form.Item 
              name="insta" 
              label="Instagram Profile"
              rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
            >
              <Input 
                prefix="📷" 
                placeholder="https://instagram.com/username" 
              />
            </Form.Item>
          </StyledCard>

          <SaveButton 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />}
            size="large"
          >
            Save Changes
          </SaveButton>
        </Space>
      </Form>
    </FormContainer>
  );
};

export default AdminIntro;

// Styled Components
const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  .ant-card-head {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px 12px 0 0;
    
    .ant-card-head-title {
      color: white;
      font-weight: 600;
    }
    
    .ant-card-extra {
      color: white;
    }
  }
  
  .ant-card-body {
    padding: 24px;
  }
  
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: none;
`;

const SaveButton = styled(Button)`
  width: 200px;
  height: 48px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  
  &:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;
