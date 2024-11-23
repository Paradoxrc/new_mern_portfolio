import { message } from 'antd';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ShowLoading, HideLoading } from '../../redux/rootSlice';
import { useSelector, useDispatch } from 'react-redux';

const LoginPage = () => {
    const [user, setUser] = React.useState({ username: '', password: '' });
    
    const dispatch = useDispatch();
    
    const login = async () => {
        try {
            dispatch(ShowLoading());
    
            // Ensure user object is correctly structured
            console.log("User data being sent:", user);
    
            const response = await axios.post('/api/portfolio/admin-login', user);
            console.log("API response:", response.data);
            dispatch(HideLoading());
    
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
        }
    };
    
    
    return (
        <PageContainer>
            <FormContainer>
                <h2>Login</h2>
                <form onSubmit={(e) => { e.preventDefault(); login(); }}> {/* Prevent default form submission */}
                    <InputContainer>
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={user.username} 
                            onChange={(e) => setUser({ ...user, username: e.target.value })} 
                            placeholder="Enter your username" 
                            required 
                        />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={user.password} 
                            onChange={(e) => setUser({ ...user, password: e.target.value })} 
                            placeholder="Enter your password" 
                            required 
                        />
                    </InputContainer>
                    <SubmitButton type="submit">Login</SubmitButton>
                </form>
            </FormContainer>
        </PageContainer>
    );
};

export default LoginPage;

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
`;

const FormContainer = styled.div`
    background-color: rgba(60, 60, 72, 0.95);
    padding: 2rem 3rem;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    width: 100%;

    h2 {
        color: #fff;
        margin-bottom: 1.5rem;
        text-align: center;
    }
`;

const InputContainer = styled.div`
    margin-bottom: 1.5rem;

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #6699ff;
        font-size: 0.9rem;
    }

    input {
        width: 100%;
        padding: 0.7rem;
        border: none;
        border-radius: 8px;
        outline: none;
        font-size: 0.9rem;
        background-color: #333;
        color: #fff;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);

        &::placeholder {
            color: #aaa;
        }
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 0.7rem;
    background-color: #6699ff;
    border: none;
    border-radius: 8px;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background-color: #578bcc;
    }
`;
