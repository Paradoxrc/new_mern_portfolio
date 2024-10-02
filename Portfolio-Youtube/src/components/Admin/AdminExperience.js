import React, { useEffect, useState } from 'react';
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

const ExperienceSection = styled.div`
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

const AdminExperience = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();
  const [deletedExperiences, setDeletedExperiences] = useState([]);

  useEffect(() => {
    if (portfolioData?.experience) {
      form.setFieldsValue({ experiences: portfolioData.experience });
    }
  }, [portfolioData, form]);

  const showConfirmationModal = (remove, name, id) => {
    Modal.confirm({
      title: `Are you sure you want to remove this experience: ${name}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        if (id) {
          setDeletedExperiences((prev) => [...prev, id]);
        }
        remove();
        form.validateFields();
      },
    });
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('/api/portfolio/update-experience', {
        experiences: values.experiences,
        deletedExperiences, // Send the deleted experiences to the server
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
        <Form.List name="experiences">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <ExperienceSection key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, 'role']}
                    label="Role"
                    rules={[{ required: true, message: 'Please input the role' }]}
                  >
                    <Input placeholder="Enter role" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'company']}
                    label="Company"
                    rules={[{ required: true, message: 'Please input the company name' }]}
                  >
                    <Input placeholder="Enter company name" />
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
                    name={[name, 'desc']}
                    label="Description"
                    rules={[{ required: true, message: 'Please input the description' }]}
                  >
                    <Input.TextArea placeholder="Enter description" />
                  </Form.Item>

                  {/* Image Field */}
                  <Form.Item
                    {...restField}
                    name={[name, 'img']}
                    label="Image URL"
                    rules={[{ required: true, message: 'Please input the image URL' }]}
                  >
                    <Input placeholder="Enter image URL" />
                  </Form.Item>

                  {/* Skills Section */}
                  <Form.List name={[name, 'skills']}>
                    {(skillFields, { add: addSkill, remove: removeSkill }) => (
                      <>
                        {skillFields.map((skillField, index) => (
                          <div key={skillField.key} style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                            <Form.Item
                              {...skillField}
                              name={[skillField.name]}
                              label={`Skill ${index + 1}`}
                              rules={[{ required: true, message: 'Please input the skill' }]}
                            >
                              <Input placeholder="Enter skill" />
                            </Form.Item>

                            <RemoveButton
                              onClick={() => removeSkill(skillField.name)}
                              style={{ marginTop: '30px' }}
                            >
                              Remove Skill
                            </RemoveButton>
                          </div>
                        ))}
                        <AddButton type="dashed" onClick={() => addSkill()}>
                          Add Skill
                        </AddButton>
                      </>
                    )}
                  </Form.List>

                  <RemoveButton
                    type="danger"
                    onClick={() =>
                      showConfirmationModal(
                        () => remove(name),
                        form.getFieldValue(['experiences', name, 'role']),
                        form.getFieldValue(['experiences', name, '_id'])
                      )
                    }
                  >
                    Remove Experience
                  </RemoveButton>
                </ExperienceSection>
              ))}
              <AddButton type="dashed" onClick={() => add()}>
                Add Experience
              </AddButton>
            </>
          )}
        </Form.List>

        <div>
          <Button type="primary" htmlType="submit">
            Save Experiences
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminExperience;
