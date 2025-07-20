import React, { useEffect, useState } from 'react';
import { Tabs, Button, Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined, DashboardOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import '../../styles/admin.css';
import Intro from './AdminIntro'; 
import Skills from './AdminSkills';
import Projects from './AdminProjects';
import Education from './AdminEducation';
import Experience from './AdminExperience';
import Article from './AdminArticlce';
import Award from './AdminAward';
import Testimonial from './AdminTestimonials';

const Admin = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/admin-login';
    } else {
      try {
        const parsedToken = JSON.parse(token);
        setUserInfo(parsedToken.data);
      } catch (error) {
        console.error('Error parsing token:', error);
        window.location.href = '/admin-login';
      }
    }
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  };

  const userMenuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const items = [
    {
      key: '1',
      label: (
        <TabLabel>
          <TabIcon>👋</TabIcon>
          Intro
        </TabLabel>
      ),
      children: <Intro />,
    },
    {
      key: '2',
      label: (
        <TabLabel>
          <TabIcon>⚡</TabIcon>
          Skills
        </TabLabel>
      ),
      children: <Skills />,
    },
    {
      key: '3',
      label: (
        <TabLabel>
          <TabIcon>🚀</TabIcon>
          Projects
        </TabLabel>
      ),
      children: <Projects />,
    },
    {
      key: '4',
      label: (
        <TabLabel>
          <TabIcon>🎓</TabIcon>
          Education
        </TabLabel>
      ),
      children: <Education />,
    },
    {
      key: '5',
      label: (
        <TabLabel>
          <TabIcon>💼</TabIcon>
          Experience
        </TabLabel>
      ),
      children: <Experience />,
    },
    {
      key: '6',
      label: (
        <TabLabel>
          <TabIcon>📝</TabIcon>
          Articles
        </TabLabel>
      ),
      children: <Article />,
    },
    {
      key: '7',
      label: (
        <TabLabel>
          <TabIcon>🏆</TabIcon>
          Awards
        </TabLabel>
      ),
      children: <Award />,
    },
    {
      key: '8',
      label: (
        <TabLabel>
          <TabIcon>💬</TabIcon>
          Testimonials
        </TabLabel>
      ),
      children: <Testimonial />,
    },
  ];

  return (
    <AdminContainer>
      <AdminHeader>
        <HeaderLeft>
          <DashboardIcon />
          <HeaderTitle>Admin Dashboard</HeaderTitle>
        </HeaderLeft>
        
        <HeaderRight>
          <WelcomeText>Welcome back, {userInfo?.username || 'Admin'}!</WelcomeText>
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <UserSection>
              <Avatar size="small" icon={<UserOutlined />} />
              <UserName>{userInfo?.username || 'Admin'}</UserName>
              <DownOutlined />
            </UserSection>
          </Dropdown>
        </HeaderRight>
      </AdminHeader>

      <AdminContent>
        <StyledTabs 
          defaultActiveKey="1" 
          items={items} 
          onChange={onChange}
          type="card"
          size="large"
        />
      </AdminContent>
    </AdminContainer>
  );
};

export default Admin;

// Styled Components
const AdminContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const AdminHeader = styled.div`
  background: white;
  padding: 16px 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DashboardIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;

  &::before {
    content: '📊';
  }
`;

const HeaderTitle = styled.h1`
  margin: 0;
  color: #1f2937;
  font-size: 24px;
  font-weight: 700;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const WelcomeText = styled.span`
  color: #6b7280;
  font-size: 14px;
  margin-right: 8px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const UserName = styled.span`
  color: #374151;
  font-weight: 500;
`;

const AdminContent = styled.div`
  padding: 24px 32px;
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    background: white;
    border-radius: 12px;
    padding: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    margin-bottom: 24px;
  }

  .ant-tabs-tab {
    border-radius: 8px !important;
    border: none !important;
    margin: 0 4px;
    transition: all 0.3s ease;

    &.ant-tabs-tab-active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;

      .ant-tabs-tab-btn {
        color: white !important;
      }
    }

    &:hover:not(.ant-tabs-tab-active) {
      background: #f8fafc;
    }
  }

  .ant-tabs-content-holder {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    padding: 24px;
    min-height: 60vh;
  }
`;

const TabLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
`;

const TabIcon = styled.span`
  font-size: 16px;
`;
