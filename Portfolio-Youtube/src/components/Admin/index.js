import React from 'react';
import { Tabs } from 'antd';
import Intro from './AdminIntro'; 
import Skills from './AdminSkills';
import Projects from './AdminProjects';
import Education from './AdminEducation';
import Experience from './AdminExperience';
import Article from './AdminArticlce';
import Award from './AdminAward';



const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: <div style={{ paddingLeft: '20px' }}>Intro</div>, // Add padding here
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

const Admin = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);

export default Admin;
