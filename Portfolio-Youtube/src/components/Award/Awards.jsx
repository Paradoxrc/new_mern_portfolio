import React from 'react';
import styled from 'styled-components';
import SliderComponent from './Slider';
import { Zoom } from 'react-awesome-reveal';

const Awards = () => {
    return (
        <Container id='awards'>
            <Zoom>
                <Title>Awards & <span className="highlight">Achievements</span></Title>
                <Desc>Here are some Awards and Achievements in my life</Desc>
            </Zoom>
            <Slide>
                <SliderComponent />
            </Slide>
        </Container>
    );
};

export default Awards;

const Container = styled.div`
    width: 80%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 3rem 0;
    text-align: center;
    position: relative;
    padding-bottom: 5rem; /* Add bottom padding for extra spacing */
    
    @media (max-width: 840px) {
        width: 90%;
    }
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary}; /* Primary text color */
    margin-bottom: 1rem;
    
    .highlight {
        color: #739efe; /* Matches the color of TimelineConnector in the previous page */
    }

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Desc = styled.p`
    font-size: 1rem;
    color: ${({ theme }) => theme.text_secondary}; /* Secondary text color */
    width: 28rem;
    margin: 0 auto;
    padding: 1rem 0;
    
    @media (max-width: 500px) {
        width: 90%;
        font-size: 0.9rem;
    }
`;

const Slide = styled.div`
    margin-top: 2rem;
    margin-bottom: 4rem; /* Add bottom margin for spacing */
`;
