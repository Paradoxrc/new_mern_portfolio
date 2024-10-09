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

const ArticleSection = styled.div`
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

const AdminArticles = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchArticles(); // Fetch articles on component mount
  }, []);

  const fetchArticles = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get('/api/portfolio/get-articles');
      if (response.data.length > 0) {
        // Set form values if articles exist
        form.setFieldsValue({
          articles: response.data.map((article) => ({
            ...article,
            key: article._id, // Assuming _id is a unique identifier in MongoDB
          })),
        });
      }
      dispatch(HideLoading());
    } catch (error) {
      console.error('Error fetching articles:', error);
      message.error('Failed to fetch articles');
      dispatch(HideLoading());
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('/api/portfolio/update-articles', { articles: values.articles });
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
      title: 'Are you sure you want to delete this article?',
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
        <Form.List name="articles">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Collapse key={key} defaultActiveKey={[]} ghost>
                  <Collapse.Panel header={form.getFieldValue(['articles', name, 'title']) || `Article ${key + 1}`} key={key}>
                    <ArticleSection>
                      <Form.Item
                        name={[name, 'title']}
                        label="Article Title"
                        rules={[{ required: true, message: 'Please input the article title' }]}
                      >
                        <Input placeholder="Enter article title" />
                      </Form.Item>

                      <Form.Item
                        name={[name, 'desc']} // Change from 'description' to 'desc'
                        label="Article Description"
                        rules={[{ required: true, message: 'Please input the article description' }]}
                      >
                          
                        <Input.TextArea rows={4} placeholder="Enter article description" />
                      </Form.Item>
                      <Form.Item
                        name={[name, 'link']} // Change from 'description' to 'desc'
                        label="Article Link"
                        rules={[{ required: true, message: 'Please input the link' }]}
                        
                      ><Input placeholder="Enter article link" /></Form.Item>

                      <Form.Item
                        name={[name, 'img']} // Change from 'imageUrl' to 'img'
                        label="Image URL"
                        rules={[{ required: true, message: 'Please input the image URL' }]}
                      >
                        <Input placeholder="Enter image URL" />
                      </Form.Item>

                      <RemoveButton onClick={() => confirmDelete(remove, name)}>
                        Remove Article
                      </RemoveButton>
                    </ArticleSection>
                  </Collapse.Panel>
                </Collapse>
              ))}
              <AddButton type="dashed" onClick={() => add()}>
                Add Article
              </AddButton>
            </>
          )}
        </Form.List>

        <div>
          <Button type="primary" htmlType="submit">
            Save Articles
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminArticles;
