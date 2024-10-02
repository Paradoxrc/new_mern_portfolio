import React, { useEffect, useState } from 'react';
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

const ProjectSection = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
`;

const RemoveButton = styled(Button)`
  margin-top: 10px;
  margin-left: 10px;
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

const AdminProjects = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();
  const [deletedProjects, setDeletedProjects] = useState([]);

  useEffect(() => {
    if (portfolioData?.project) {
      form.setFieldsValue({ projects: portfolioData.project });
    }
  }, [portfolioData, form]);

  const onFinish = async (values) => {
    try {
      const updatedProjects = values.projects.map((project) => {
        if (!project._id) {
          const { _id, ...rest } = project;
          return rest; // Ensure new projects don't send _id
        }
        return project;
      });

      console.log('Projects to be updated:', updatedProjects);
      console.log('Deleted projects:', deletedProjects);

      dispatch(ShowLoading());
      const response = await axios.post('/api/portfolio/update-projects', {
        projects: updatedProjects,
        deletedProjects,
      });
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        setDeletedProjects([]); // Reset deleted projects
        form.resetFields(); // Reset form
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.error('Error:', error);
      message.error(error.message);
    }
  };

  const confirmDelete = (remove, fieldName) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this project?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const projectId = form.getFieldValue(['projects', fieldName, '_id']);
        if (projectId) {
          setDeletedProjects((prev) => [...prev, projectId]);
        }
        remove(fieldName);
      },
    });
  };

  return (
    <Container>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.List name="projects">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name: fieldName }) => (
                <Collapse key={key} defaultActiveKey={[]} ghost>
                  <Collapse.Panel
                    header={
                      form.getFieldValue(['projects', fieldName, 'title']) ||
                      `Project ${key + 1}`
                    }
                    key={key}
                    forceRender
                  >
                    <ProjectSection>
                      <Form.Item name={[fieldName, '_id']} hidden>
                        <Input />
                      </Form.Item>

                      <Form.Item
                        name={[fieldName, 'title']}
                        label="Project Title"
                        rules={[{ required: true, message: 'Please input the project title' }]}
                      >
                        <Input placeholder="Enter project title" />
                      </Form.Item>

                      <Form.Item
                        name={[fieldName, 'description']}
                        label="Project Description"
                        rules={[{ required: true, message: 'Please input the project description' }]}
                      >
                        <Input.TextArea placeholder="Enter project description" />
                      </Form.Item>

                      <Form.Item
                        name={[fieldName, 'image']}
                        label="Project Image URL"
                        rules={[{ required: true, message: 'Please input the image URL' }]}
                      >
                        <Input placeholder="Enter image URL" />
                      </Form.Item>

                      <Form.Item
                        name={[fieldName, 'category']}
                        label="Project Category"
                        rules={[{ required: true, message: 'Please input the project category' }]}
                      >
                        <Input placeholder="Enter project category" />
                      </Form.Item>

                      <Form.Item
                        name={[fieldName, 'date']}
                        label="Project Date"
                        rules={[{ required: true, message: 'Please input the project date' }]}
                      >
                        <Input placeholder="Enter project date (e.g., 2024-10-01)" />
                      </Form.Item>

                      <Form.Item
                        name={[fieldName, 'github']}
                        label="Project GitHub URL"
                        rules={[{ required: true, message: 'Please input the GitHub URL' }]}
                      >
                        <Input placeholder="Enter GitHub URL" />
                      </Form.Item>

                      <Form.Item
                        name={[fieldName, 'webapp']}
                        label="Project WebApp URL"
                        rules={[{ required: true, message: 'Please input the WebApp URL' }]}
                      >
                        <Input placeholder="Enter WebApp URL" />
                      </Form.Item>

                      {/* Tags */}
                      <Form.List name={[fieldName, 'tags']}>
                        {(tagFields, { add: addTagField, remove: removeTagField }) => (
                          <>
                            {tagFields.map((tagField, index) => (
                              <div
                                key={tagField.key}
                                style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}
                              >
                                <Form.Item
                                  {...tagField}
                                  name={[tagField.name]}
                                  label={`Tag ${index + 1}`}
                                  rules={[{ required: true, message: 'Please input the tag' }]}
                                >
                                  <Input placeholder="Enter tag" />
                                </Form.Item>

                                <RemoveButton onClick={() => removeTagField(tagField.name)}>
                                  Remove Tag
                                </RemoveButton>
                              </div>
                            ))}
                            <AddButton type="dashed" onClick={() => addTagField()}>
                              Add Tag
                            </AddButton>
                          </>
                        )}
                      </Form.List>

                      {/* Members */}
                      <Form.List name={[fieldName, 'member']}>
                        {(memberFields, { add: addMemberField, remove: removeMemberField }) => (
                          <>
                            {memberFields.map(({ key: memberKey, name: memberName }) => (
                              <div key={memberKey} style={{ marginBottom: '10px' }}>
                                <h4>Member {memberName + 1}</h4>
                                <Form.Item
                                  name={[memberName, 'name']}
                                  label="Member Name"
                                  rules={[{ required: false, message: 'Please input the member name' }]}
                                >
                                  <Input placeholder="Enter member name" />
                                </Form.Item>

                                <Form.Item
                                  name={[memberName, 'img']}
                                  label="Member Image URL"
                                  rules={[{ required: false, message: 'Please input the image URL' }]}
                                >
                                  <Input placeholder="Enter member image URL" />
                                </Form.Item>

                                <Form.Item
                                  name={[memberName, 'github']}
                                  label="Member GitHub"
                                  rules={[{ required: false, message: 'Please input the GitHub link' }]}
                                >
                                  <Input placeholder="Enter GitHub link" />
                                </Form.Item>

                                <Form.Item
                                  name={[memberName, 'linkedin']}
                                  label="Member LinkedIn"
                                  rules={[{ required: false, message: 'Please input the LinkedIn link' }]}
                                >
                                  <Input placeholder="Enter LinkedIn link" />
                                </Form.Item>

                                <RemoveButton onClick={() => removeMemberField(memberName)}>
                                  Remove Member
                                </RemoveButton>
                              </div>
                            ))}
                            <AddButton type="dashed" onClick={() => addMemberField()}>
                              Add Member
                            </AddButton>
                          </>
                        )}
                      </Form.List>

                      <RemoveButton
                        onClick={() => confirmDelete(remove, fieldName)}
                      >
                        Remove Project
                      </RemoveButton>
                    </ProjectSection>
                  </Collapse.Panel>
                </Collapse>
              ))}
              <AddButton type="dashed" onClick={() => add()}>
                Add Project
              </AddButton>
            </>
          )}
        </Form.List>

        <div>
          <Button type="primary" htmlType="submit">
            Save Projects
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminProjects;
