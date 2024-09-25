import React from 'react';
import styled from 'styled-components';

const Award = (props) => {
    const { img, desc } = props.item || {}; // Safeguard props.item

    // If img or desc are undefined, render a placeholder for testing
    return (
        <Container>
            <Image src={img || "https://via.placeholder.com/400"} alt="project" />
            <Description>
                {/* <Title>Description</Title> */}
                <Text>{desc || "No description available."}
                    <DemoLink href="/">demo</DemoLink>
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
    cursor: pointer;
    position: relative;
    transition: all 0.5s ease-in-out;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 50px 4px rgba(0,0,0,0.6);
        filter: brightness(1.1);
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 400ms ease-in-out;
`;

const Description = styled.div`
    position: absolute;
    bottom: -120px;
    left: 0;
    right: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.8));
    padding: 1rem;
    transition: bottom 400ms ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 120px;
    &:hover {
        bottom: 0;
    }
    ${Container}:hover & {
        bottom: 0;
    }
`;

const Title = styled.h1`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary || "#fff"};
`;

const Text = styled.p`
    font-size: 0.9rem;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary || "#ccc"}99;
`;

const DemoLink = styled.a`
    color: ${({ theme }) => theme.primary || "#01be96"};
    margin-left: 0.4rem;
    font-weight: 500;
    text-decoration: underline;
    &:hover {
        color: ${({ theme }) => theme.primaryHover || "#028d68"};
    }
`;
