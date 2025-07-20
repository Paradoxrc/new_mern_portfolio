import { message } from 'antd';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { ShowLoading, HideLoading } from '../../redux/rootSlice';
import { useSelector, useDispatch } from 'react-redux';

const LoginPage = () => {
    const [user, setUser] = React.useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = React.useState(false);
    
    const dispatch = useDispatch();
    
    const login = async () => {
        try {
            setIsLoading(true);
            dispatch(ShowLoading());
    
            // Ensure user object is correctly structured
            console.log("User data being sent:", user);
    
            // Try production server first, fallback to localhost if it fails
            let response;
            try {
                response = await axios.post('https://dinith-edirisinghe.onrender.com/api/portfolio/admin-login', user);
            } catch (primaryError) {
                console.warn('Production server failed, trying localhost fallback...');
                response = await axios.post('http://localhost:10000/api/portfolio/admin-login', user);
            }
            console.log("API response:", response.data);
            dispatch(HideLoading());
            setIsLoading(false);
    
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem('token', JSON.stringify(response.data)); // Store token if needed
                window.location.href = '/admin'; // Redirect to admin page
            } else {
                message.error(response.data.message); // Invalid credentials error
            }
        } catch (error) {
            // Log error details for debugging
            console.error("Login error:", error.response ? error.response.data : error.message);
            message.error('Login failed. Please try again.');
            dispatch(HideLoading());
            setIsLoading(false);
        }
    };
    
    
    return (
        <PageContainer>
            <LoginCard>
                <LogoSection>
                    <Logo>🚀</Logo>
                    <Title>Admin Portal</Title>
                    <Subtitle>Welcome back! Please sign in to continue.</Subtitle>
                </LogoSection>
                
                <FormContainer>
                    <form onSubmit={(e) => { e.preventDefault(); login(); }}>
                        <InputGroup>
                            <InputLabel htmlFor="username">
                                <UserIcon>👤</UserIcon>
                                Username
                            </InputLabel>
                            <StyledInput 
                                type="text" 
                                id="username" 
                                value={user.username} 
                                onChange={(e) => setUser({ ...user, username: e.target.value })} 
                                placeholder="Enter your username" 
                                required 
                            />
                        </InputGroup>
                        
                        <InputGroup>
                            <InputLabel htmlFor="password">
                                <LockIcon>🔒</LockIcon>
                                Password
                            </InputLabel>
                            <StyledInput 
                                type="password" 
                                id="password" 
                                value={user.password} 
                                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                                placeholder="Enter your password" 
                                required 
                            />
                        </InputGroup>
                        
                        <LoginButton type="submit" disabled={isLoading}>
                            {isLoading ? <Spinner /> : 'Sign In'}
                        </LoginButton>
                    </form>
                </FormContainer>
            </LoginCard>
        </PageContainer>
    );
};

export default LoginPage;

// Animations
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(-20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: ${float} 20s ease-in-out infinite;
  }
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  max-width: 450px;
  width: 100%;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
  z-index: 1;
`;

const LogoSection = styled.div`
  text-align: center;
  padding: 40px 40px 20px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const Logo = styled.div`
  font-size: 3rem;
  margin-bottom: 10px;
  animation: ${float} 3s ease-in-out infinite;
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  margin: 0;
  opacity: 0.9;
  font-size: 0.95rem;
  font-weight: 300;
`;

const FormContainer = styled.div`
  padding: 40px;
`;

const InputGroup = styled.div`
  margin-bottom: 25px;
`;

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
`;

const UserIcon = styled.span`
  margin-right: 8px;
  font-size: 1rem;
`;

const LockIcon = styled.span`
  margin-right: 8px;
  font-size: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 15px 18px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  font-size: 1rem;
  background-color: #fafafa;
  color: #374151;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border-color: #667eea;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff3d;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;
