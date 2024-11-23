import React, { useEffect } from 'react';
import { Form, Input, message, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/rootSlice';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
  background-color: #52c41a; /* Greenish color */
  color: #fff;

  &:hover {
    background-color: #73d13d; /* Lighter green on hover */
    color: #fff;
  }
`;

const AdminIntro = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm(); // Create form instance

  useEffect(() => {
    if (portfolioData?.intro) {
      form.setFieldsValue(portfolioData.intro); // Update the form values
    }
  }, [portfolioData, form]); // Runs whenever portfolioData changes

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('https://newww-mern-portfolio-backend.onrender.com/api/portfolio/update-intro', {
        ...values,
        _id: portfolioData.intro._id,
      });
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Container>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <FormSection>
          <Form.Item name="name" label="Name">
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item name="roles" label="Roles">
            <Input placeholder="Enter your roles" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter your description" />
          </Form.Item>

          <Form.Item name="resume" label="Resume URL">
            <Input placeholder="Enter your resume URL" />
          </Form.Item>

          <Form.Item name="github" label="GitHub URL">
            <Input placeholder="Enter your GitHub URL" />
          </Form.Item>

          <Form.Item name="youtube" label="YouTube URL">
            <Input placeholder="Enter your YouTube URL" />
          </Form.Item>

          <Form.Item name="linkedin" label="LinkedIn URL">
            <Input placeholder="Enter your LinkedIn URL" />
          </Form.Item>

          <Form.Item name="insta" label="Instagram URL">
            <Input placeholder="Enter your Instagram URL" />
          </Form.Item>

          <Form.Item name="phone" label="Phone number">
            <Input placeholder="Enter your contact number" />
          </Form.Item>

          <Form.Item name="email" label="Email address">
            <Input placeholder="Enter your email address" />
          </Form.Item>

          <Form.Item name="address" label="Home address">
            <Input placeholder="Enter your home address" />
          </Form.Item>
        </FormSection>

        <StyledButton type="primary" htmlType="submit">
          Save
        </StyledButton>
      </Form>
    </Container>
  );
};

export default AdminIntro;
