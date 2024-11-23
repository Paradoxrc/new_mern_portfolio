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

const AwardSection = styled.div`
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

const AdminAwards = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAwards(); // Fetch awards on component mount
  }, []);

  const fetchAwards = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get('/api/portfolio/get-awards');
      if (response.data.length > 0) {
        // Set form values if awards exist
        form.setFieldsValue({
          awards: response.data.map((award) => ({
            ...award,
            key: award._id, // Assuming _id is a unique identifier in MongoDB
          })),
        });
      }
      dispatch(HideLoading());
    } catch (error) {
      console.error('Error fetching awards:', error);
      message.error('Failed to fetch awards');
      dispatch(HideLoading());
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('https://newww-mern-portfolio-backend.onrender.com/api/portfolio/update-awards', { awards: values.awards });
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
      title: 'Are you sure you want to delete this award?',
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
        <Form.List name="awards">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Collapse key={key} defaultActiveKey={[]} ghost>
                  <Collapse.Panel header={`Award ${key + 1}`} key={key}>
                    <AwardSection>
                      <Form.Item
                        name={[name, 'desc']}
                        label="Award Description"
                        rules={[{ required: true, message: 'Please input the award description' }]}
                      >
                        <Input.TextArea rows={4} placeholder="Enter award description" />
                      </Form.Item>

                      <Form.Item
                        name={[name, 'img']}
                        label="Image URL"
                        rules={[{ required: true, message: 'Please input the image URL' }]}
                      >
                        <Input placeholder="Enter image URL" />
                      </Form.Item>

                      <RemoveButton onClick={() => confirmDelete(remove, name)}>
                        Remove Award
                      </RemoveButton>
                    </AwardSection>
                  </Collapse.Panel>
                </Collapse>
              ))}
              <AddButton type="dashed" onClick={() => add()}>
                Add Award
              </AddButton>
            </>
          )}
        </Form.List>

        <div>
          <Button type="primary" htmlType="submit">
            Save Awards
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminAwards;
