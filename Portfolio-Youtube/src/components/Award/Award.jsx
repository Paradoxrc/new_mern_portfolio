import React from 'react';
import styled from 'styled-components';

const Award = (props) => {
    const { img, desc } = props.item || {}; // Safeguard props.item

    return (
        <Container>
            <Image src={img || "https://via.placeholder.com/400"} alt="project" />
            <Description>
                <Text>{desc || "No description available."}
                    
                </Text>
            </Description>
        </Container>
    );
}

export default Award;

const Container = styled.div`
    width: 400px;
    height: 280px;
    background-color: ${({ theme }) => theme.card || "#fff"}; 
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
    border: 0.1px solid #854CE6;
    cursor: pointer;
    position: relative;
    transition: all 0.5s ease-in-out;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 50px 4px rgba(0,0,0,0.6);
        filter: brightness(1.1);
    }
           @media (max-width: 1024px) {
        width: 280px;
        height: 180px;
    }

    @media (max-width: 768px) {
        width: 240px;
        height: 180px;
    }

    @media (max-width: 480px) {
        width: 290px;
        height: 200px;
      
    margin: 0 auto;
    
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 400ms ease-in-out;

    @media (max-width: 768px) {
        height: 100%;
    }

    @media (max-width: 480px) {
        height: 100%;
    }
`;

const Description = styled.div`
    position: absolute;
    bottom: -80px;
    left: 0;
    right: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.8));
    padding: 0.8rem;
    transition: bottom 400ms ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80px;

    ${Container}:hover & {
        bottom: 0;
    }

    @media (max-width: 768px) {
        height: 60px;
        bottom: -60px;
    }

    @media (max-width: 480px) {
        height: 40px;
        bottom: -40px;
    }
`;

const Text = styled.p`
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary || "#ccc"};

    @media (max-width: 768px) {
        font-size: 0.7rem;
    }

    @media (max-width: 480px) {
        font-size: 0.6rem;
    }
`;

const DemoLink = styled.a`
    color: ${({ theme }) => theme.primary || "#01be96"};
    margin-left: 0.4rem;
    font-weight: 500;
    text-decoration: underline;
    
    &:hover {
        color: ${({ theme }) => theme.primaryHover || "#028d68"};
    }

    @media (max-width: 768px) {
        font-size: 0.7rem;
    }

    @media (max-width: 480px) {
        font-size: 0.6rem;
    }
`;
