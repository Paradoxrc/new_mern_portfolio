import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled, { keyframes } from 'styled-components';

const AdminLoader = ({ tip = "Loading...", size = "large" }) => {
  const customIcon = <LoadingOutlined style={{ fontSize: 24, color: '#667eea' }} spin />;

  return (
    <LoaderContainer>
      <LoaderCard>
        <StyledSpin indicator={customIcon} size={size}>
          <LoaderContent>
            <LoaderIcon>⚡</LoaderIcon>
            <LoaderText>{tip}</LoaderText>
          </LoaderContent>
        </StyledSpin>
      </LoaderCard>
    </LoaderContainer>
  );
};

export default AdminLoader;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Styled Components
const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoaderCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 200px;
`;

const StyledSpin = styled(Spin)`
  .ant-spin-dot {
    color: #667eea !important;
  }
`;

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const LoaderIcon = styled.div`
  font-size: 2rem;
  animation: ${float} 2s ease-in-out infinite;
`;

const LoaderText = styled.div`
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  animation: ${pulse} 2s ease-in-out infinite;
`;
