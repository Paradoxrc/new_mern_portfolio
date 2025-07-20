import React from 'react';
import styled from 'styled-components';
import SliderComponent from './Slider';
import { Zoom } from 'react-awesome-reveal';

const Articles = () => {
    return (
        <Container id='articles'>
            <Zoom>
                <Title>Recent <span className="highlight">Articles</span></Title>
                <Desc>Read and enjoy the blog posts I have written about different topics</Desc>
            </Zoom>
            <Slide>
                <SliderComponent />
            </Slide>
        </Container>
    );
};

export default Articles;

const Container = styled.div`
    width: 85%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem 0 6rem 0;
    text-align: center;
    position: relative;
    min-height: 500px;
    
    @media (max-width: 840px) {
        width: 90%;
        padding: 3rem 0 5rem 0;
    }

    @media (max-width: 480px) {
        width: 95%;
        padding: 2rem 0 4rem 0;
    }
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    .highlight {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    @media (max-width: 768px) {
        font-size: 2.2rem;
        margin-bottom: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 1.8rem;
        letter-spacing: 0.5px;
    }
`;

const Desc = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text_secondary};
    max-width: 600px;
    margin: 0 auto 3rem auto;
    line-height: 1.6;
    font-weight: 400;
    
    @media (max-width: 768px) {
        font-size: 1rem;
        max-width: 500px;
        margin-bottom: 2rem;
    }
    
    @media (max-width: 480px) {
        width: 90%;
        font-size: 0.95rem;
        margin-bottom: 1.5rem;
    }
`;

const Slide = styled.div`
    margin-top: 1rem;
    padding: 0 2rem;
    
    @media (max-width: 768px) {
        padding: 0 1rem;
    }

    @media (max-width: 480px) {
        padding: 0 0.5rem;
    }
`;
