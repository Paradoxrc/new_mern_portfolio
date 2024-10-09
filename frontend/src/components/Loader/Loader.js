import React from 'react';
import styled, { keyframes } from 'styled-components';
import honeycomb from '../../images/honeycomb.png'; // Ensure the path is correct

// Keyframes for pulsing dots animation
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;

// Keyframes for growing and shrinking effect on logo
const growShrink = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2); // Adjust scale factor as needed
  }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bg}; /* Background color based on theme */
  z-index: 9999; /* Ensure loader is on top of everything */
`;

const LoaderText = styled.h1`
  color: ${({ theme }) => theme.text_primary}; /* Text color based on theme */
  font-size: 2rem;
  margin-bottom: 20px; /* Space between text and dots */
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  width: 8px; /* Size of the dots */
  height: 8px;
  margin: 0 5px; /* Spacing between dots */
  background-color: ${({ theme }) => theme.primary}; /* Dot color based on theme */
  border-radius: 50%; /* Make dots circular */
  animation: ${pulse} 1.2s ease-in-out infinite; /* Pulsing animation */
  
  &:nth-child(1) {
    animation-delay: 0s; /* First dot */
  }

  &:nth-child(2) {
    animation-delay: 0.2s; /* Second dot */
  }

  &:nth-child(3) {
    animation-delay: 0.4s; /* Third dot */
  }
`;

// Styled component for the logo image
const LogoImage = styled.img`
  width: 70px;  // Adjust the width as needed
  height: 70px; // Adjust the height as needed
  display: inline-block;
  margin-bottom: 20px; // Space between logo and text
  animation: ${growShrink} 2s ease-in-out infinite; // Grow and shrink animation
  @media (max-width: 768px) {
   width: 40px;
   height: 40px;
  }
`;

function Loader() {
  return (
    <LoaderWrapper>
      <LogoImage src={honeycomb} alt="Logo" />
      <LoaderText>Loading</LoaderText>
      <DotsContainer>
        <Dot />
        <Dot />
        <Dot />
      </DotsContainer>
    </LoaderWrapper>
  );
}

export default Loader;
