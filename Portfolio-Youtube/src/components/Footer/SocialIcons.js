import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { Facebook, Github, LinkedIn, YouTube } from "./AllSvgs";
import { useSelector } from 'react-redux'; 
import { GitHub } from "@mui/icons-material";


const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 2rem;
  z-index: 3;
  

  & > *:not(:last-child) {
    margin: 0.5rem 0;
  }

  @media (max-width: 768px) {
  display: none;
    // position: absolute;
    // flex-direction: row;
    
    // bottom: 0rem;
    // left: 50%;
    // transform: translateX(-50%);
    // & > *:not(:last-child) {
    //   margin: 0 0.5rem;
    }
  }
`;

const Line = styled(motion.span)`
  width: 2px;
  height: 8rem;
  background-color:white;

  @media (max-width: 768px) {
    // width: 0rem;
    // height: 0px;
    // margin-top: 0.5rem;
  }
`;

const SocialIcons = (props) => {

  const { portfolioData } = useSelector((state) => state.root);
  const intro = portfolioData?.intro;
 
 
  const linkedin = intro?.linkedin;
  const youtube = intro?.youtube;
  const github = intro?.github;
  const facebook = intro?.facebook;

  return (
    <Icons>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.5, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1 }}
      >
        <a
          style={{ color: "inherit" }}
          target="_blank"
          rel="noopener noreferrer"
          href={github}
        >
          <Github
            width={25}
            height={25}
            fill="white"
            
          />
        </a>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.5, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1.2 }}
      >
        <a
          style={{ color: "inherit" }}
          target="_blank"
          rel="noopener noreferrer"
          href={linkedin}
        >
          <LinkedIn
            width={25}
            height={25}
            fill="white"
           
          />
        </a>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.5, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1.4 }}
      >
        <a
          style={{ color: "inherit" }}
          target="_blank"
          rel="noopener noreferrer"
          href={facebook}
        >
          <Facebook
            width={25}
            height={25}
            fill="white"
           
          />
        </a>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.5, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1.6 }}
      >
        <a
          style={{ color: "inherit" }}
          target="_blank"
          rel="noopener noreferrer"
          href={youtube}
        >
          <YouTube
            width={25}
            height={25}
            fill="white"
            
          />
        </a>
      </motion.div>

      <Line
        color={props.theme}
        initial={{ height: 0 }}
        animate={{ height: "8rem" }}
        transition={{ type: "spring", duration: 1, delay: 0.8 }}
      />
    </Icons>
  );
};

export default SocialIcons;
