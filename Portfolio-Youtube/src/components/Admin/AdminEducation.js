import React, { useEffect } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
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

const EducationSection = styled.div`
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

const AdminEducation = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();

  useEffect(() => {
    if (portfolioData?.education) {
      form.setFieldsValue({ education: portfolioData.education });
    }
  }, [portfolioData, form]);

  const showConfirmationModal = (remove, name) => {
    Modal.confirm({
      title: `Are you sure you want to remove this education entry: ${name}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        remove();
      },
    });
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('/api/portfolio/update-education', { education: values.education });
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
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <EducationSection key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, 'school']}
                    label="School Name"
                    rules={[{ required: true, message: 'Please input the school name' }]}
                  >
                    <Input placeholder="Enter school name" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'degree']}
                    label="Degree"
                    rules={[{ required: true, message: 'Please input the degree' }]}
                  >
                    <Input placeholder="Enter degree" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'date']}
                    label="Date"
                    rules={[{ required: true, message: 'Please input the date' }]}
                  >
                    <Input placeholder="Enter date" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'grade']}
                    label="Grade"
                    rules={[{ required: true, message: 'Please input the grade' }]}
                  >
                    <Input placeholder="Enter grade" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'img']}
                    label="Image URL"
                    rules={[{ required: true, message: 'Please input the image URL' }]}
                  >
                    <Input placeholder="Enter image URL" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'desc']}
                    label="Description"
                    rules={[{ required: true, message: 'Please input the description' }]}
                  >
                    <Input.TextArea placeholder="Enter description" />
                  </Form.Item>

                  <RemoveButton type="danger" onClick={() => showConfirmationModal(remove, form.getFieldValue(['education', name, 'school']))}>
                    Remove Education
                  </RemoveButton>
                </EducationSection>
              ))}
              <AddButton type="dashed" onClick={() => add()}>
                Add Education
              </AddButton>
            </>
          )}
        </Form.List>

        <div>
          <Button type="primary" htmlType="submit">
            Save Education
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminEducation;
