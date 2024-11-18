import React, { useEffect } from 'react';
import { Tabs, Button } from 'antd';
import Intro from './AdminIntro'; 
import Skills from './AdminSkills';
import Projects from './AdminProjects';
import Education from './AdminEducation';
import Experience from './AdminExperience';
import Article from './AdminArticlce';
import Award from './AdminAward';

const Admin = () => {
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/admin-login';
    }
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    window.location.href = '/admin-login'; // Redirect to the login page
  };

  const items = [
    {
      key: '1',
      label: <div style={{ paddingLeft: '20px' }}>Intro</div>,
      children: <Intro />,
    },
    {
      key: '2',
      label: 'Skills',
      children: <Skills />,
    },
    {
      key: '3',
      label: 'Projects',
      children: <Projects />,
    },
    {
      key: '4',
      label: 'Education',
      children: <Education />,
    },
    {
      key: '5',
      label: 'Experience',
      children: <Experience />,
    },
    {
      key: '6',
      label: 'Article',
      children: <Article />,
    },
    {
      key: '7',
      label: 'Awards',
      children: <Award />,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Admin Panel</h1>
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default Admin;
