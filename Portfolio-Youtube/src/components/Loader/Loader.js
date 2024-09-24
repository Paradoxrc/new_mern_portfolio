import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 1); /* Semi-transparent background */
  z-index: 9999; /* Ensure loader is on top of everything */
`;

const LoaderText = styled.h1`
  color: white;
  font-size: 2rem;
`;

function Loader() {
  return (
    <LoaderWrapper>
      <LoaderText>Loading...</LoaderText>
    </LoaderWrapper>
  );
}

export default Loader;
