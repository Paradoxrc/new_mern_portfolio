import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Modal, InputNumber } from 'antd';
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

const TestimonialSection = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
`;

const RemoveButton = styled(Button)`
  margin-top: 10px;
  background-color: #ff4d4f;
  color: #fff;

  &:hover {
    background-color: #ff7875;
    color: #fff;
  }
`;

const AddButton = styled(Button)`
  margin-top: 10px;
  background-color: #52c41a;
  color: #fff;

  &:hover {
    background-color: #73d13d;
    color: #fff;
  }
`;

const AdminTestimonials = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();
  const [deletedTestimonials, setDeletedTestimonials] = useState([]);

  useEffect(() => {
    console.log('portfolioData:', portfolioData);
    if (portfolioData?.testimonials) {
      form.setFieldsValue({ testimonials: portfolioData.testimonials });
    }
  }, [portfolioData, form]);

  const showConfirmationModal = (remove, name, id) => {
    Modal.confirm({
      title: `Are you sure you want to remove this testimonial: ${name}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        if (id) {
          setDeletedTestimonials((prev) => [...prev, id]);
        }
        remove();
        form.validateFields();
      },
    });
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('https://newww-mern-portfolio-backend.onrender.com/api/portfolio/update-testimonials', {
        testimonials: values.testimonials,
        deletedTestimonials, // Send the deleted testimonials to the server
      });
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Container>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.List name="testimonials">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <TestimonialSection key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    label="Name"
                    rules={[{ required: true, message: 'Please input the name' }]}
                  >
                    <Input placeholder="Enter name" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'position']}
                    label="Position"
                  >
                    <Input placeholder="Enter position (optional)" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'stars']}
                    label="Stars"
                    rules={[{ required: true, message: 'Please input the number of stars' }]}
                  >
                    <InputNumber min={1} max={5} placeholder="Enter stars (1-5)" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'desc']}
                    label="Description"
                    rules={[{ required: true, message: 'Please input the description' }]}
                  >
                    <Input.TextArea placeholder="Enter description" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'img']}
                    label="Image URL"
                    rules={[{ required: true, message: 'Please input the image URL' }]}
                  >
                    <Input placeholder="Enter image URL" />
                  </Form.Item>

                  <RemoveButton
                    type="danger"
                    onClick={() =>
                      showConfirmationModal(
                        () => remove(name),
                        form.getFieldValue(['testimonials', name, 'name']),
                        form.getFieldValue(['testimonials', name, '_id'])
                      )
                    }
                  >
                    Remove Testimonial
                  </RemoveButton>
                </TestimonialSection>
              ))}
              <AddButton type="dashed" onClick={() => add()}>
                Add Testimonial
              </AddButton>
            </>
          )}
        </Form.List>

        <div>
          <Button type="primary" htmlType="submit">
            Save Testimonials
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminTestimonials;