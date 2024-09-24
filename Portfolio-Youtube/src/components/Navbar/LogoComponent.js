import React from 'react'
import styled from 'styled-components'
import honeycomb from '../../images/honeycomb.png'

// Styled component for the logo image
const LogoImage = styled.img`
  width: 70px;  // Adjust the width as needed
  height: 70px; // Adjust the height as needed
  display: inline-block;
  @media (max-width: 768px) {
   width:40px;
   height:40px;
  }
`

// Existing styled component for the logo container
const Logo = styled.h1`
  display: inline-block;
  position: fixed;
  left: 2rem;
  top: 2rem;
  z-index: 3;
  @media (max-width: 768px) {
    position: absolute;
   }
`

const LogoComponent = (props) => {
    return (
        <Logo>
            <LogoImage src={honeycomb} alt="Logo" />
            
        </Logo>
    )
}

export default LogoComponent
