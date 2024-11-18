import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from './utils/Themes.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { SetPortfolioData, ShowLoading, HideLoading } from "./redux/rootSlice.js";
import Clients from "./components/Clients/Clients";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import Admin from "./components/Admin";
import Loader from "./components/Loader/Loader.js";
import SocialIcons from "./components/Footer/SocialIcons.js";
import Chatbot from './components/Footer/chatBot.js';

import Articles from './components/Articles/Articles.jsx';// Updated file name
import Awards from './components/Award/Awards.jsx';

import styled from "styled-components";
import './App.css';

import Login from './components/Admin/Login.js';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`;

function App() {
  const { loading } = useSelector((state) => state.root);
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading()); // Show loader while fetching
      const response = await axios.get('/api/portfolio/get-portfolio-data');
      dispatch(SetPortfolioData(response.data));
      dispatch(HideLoading()); // Hide loader after data is fetched
    } catch (error) {
      console.log(error);
      dispatch(HideLoading()); // Hide loader in case of an error
    }
  };

  useEffect(() => {
    getPortfolioData();
  }, []);

  

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        {loading && <Loader />} {/* Show loader if loading is true */}
        <Routes>
          <Route 
            path="/" 
            element={
              <Body>
                <SocialIcons />
                <Chatbot/>
                <Navbar />
                <HeroSection />
                <Clients />
                <Wrapper>
                  <Skills />
                  <Experience />
                 
                </Wrapper>
                <Projects openModal={openModal} setOpenModal={setOpenModal} />
                <Awards/>
                <Wrapper>
                  <Education />
                  <Articles/> {/* Updated the slider component */}
                  
                  <Contact />
                </Wrapper>
                <Footer />
                {openModal.state && <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />}
              </Body>
            } 
          />
          {/* Admin route */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
