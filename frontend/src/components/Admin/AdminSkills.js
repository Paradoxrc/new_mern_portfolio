import React, { useEffect } from 'react';
import { Form, Input, Button, message, Collapse, Modal } from 'antd';
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

const SkillSection = styled.div`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
`;

const RemoveButton = styled(Button)`
  margin-top: 25px;
  margin-left: 10px; /* Add a little gap */
  background-color: #ff4d4f;
  color: #fff;

  &:hover {
    background-color: #ff7875;
    color: #fff;
  }
`;

const AddButton = styled(Button)`
  margin-top: 10px;
  background-color: #52c41a; /* Greenish color */
  color: #fff;

  &:hover {
    background-color: #73d13d; /* Lighter green on hover */
    color: #fff;
  }
`;

const AdminSkills = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();

  useEffect(() => {
    if (portfolioData?.skill) {
      form.setFieldsValue({ skills: portfolioData.skill });
    }
  }, [portfolioData, form]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('https://newww-mern-portfolio-backend.onrender.com/api/portfolio/update-skills', { skills: values.skills });
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

  const confirmDelete = (remove, name) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        remove(name);
      },
    });
  };

  return (
    <Container>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.List name="skills">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Collapse key={key} defaultActiveKey={[]} ghost>
                  <Collapse.Panel header={form.getFieldValue(['skills', name, 'title']) || `Skill Section ${key + 1}`} key={key}>
                    <SkillSection>
                      <Form.Item
                        name={[name, 'title']}
                        label="Skill Title"
                        rules={[{ required: true, message: 'Please input the skill title' }]}
                      >
                        <Input placeholder="Enter skill title" />
                      </Form.Item>

                      <Form.List name={[name, 'skills']}>
                        {(subFields, { add: addSubField, remove: removeSubField }) => (
                          <>
                            {subFields.map((subField, index) => (
                              <div key={subField.key} style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                                <Form.Item
                                  {...subField}
                                  name={[subField.name, 'name']}
                                  label={`Skill Name ${index + 1}`}
                                  rules={[{ required: true, message: 'Please input the skill name' }]}
                                >
                                  <Input placeholder="Enter skill name" />
                                </Form.Item>

                                <Form.Item
                                  {...subField}
                                  name={[subField.name, 'image']}
                                  label={`Skill Image URL ${index + 1}`}
                                  rules={[{ required: true, message: 'Please input the image URL' }]}
                                >
                                  <Input placeholder="Enter image URL" />
                                </Form.Item>

                                <RemoveButton onClick={() => confirmDelete(removeSubField, subField.name)}>
                                  Remove Skill
                                </RemoveButton>
                              </div>
                            ))}
                            <AddButton type="dashed" onClick={() => addSubField()}>
                              Add Skill
                            </AddButton>
                          </>
                        )}
                      </Form.List>

                      <RemoveButton onClick={() => confirmDelete(remove, name)}>
                        Remove Skill Section
                      </RemoveButton>
                    </SkillSection>
                  </Collapse.Panel>
                </Collapse>
              ))}
              <AddButton type="dashed" onClick={() => add()}>
                Add Skill Section
              </AddButton>
            </>
          )}
        </Form.List>

        <div>
          <Button type="primary" htmlType="submit">
            Save Skills
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminSkills;
