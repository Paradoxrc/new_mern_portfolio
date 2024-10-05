import React, { useState } from "react";
import styled from "styled-components";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const ChatButton = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background-color: #00bfff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: #0080ff;
  }
`;

const ChatPopup = styled.div`
  position: fixed;
  bottom: 5rem;
  right: 2rem;
  width: 400px;
  height: 500px;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  z-index: 999;
  display: ${({ show }) => (show ? "block" : "none")};

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    width: 90%;
    height: 80%;
    right: 5%;
  }
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ChatButton onClick={toggleChat}>
        <ChatBubbleOutlineIcon style={{ color: "white", fontSize: "30px" }} />
      </ChatButton>
      <ChatPopup show={isOpen}>
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/pMPWwykfpqbf8H43q4o41"
          frameborder="0"
          title="Chatbot"
        ></iframe>
      </ChatPopup>
    </>
  );
};

export default Chatbot;
