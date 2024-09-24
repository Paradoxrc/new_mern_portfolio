import React from 'react';
import styled from 'styled-components';

const Article = (props) => {
    const { img, disc } = props.item;
    return (
        <Container className='project'>
            <Image src={img} alt="project" />
            <Description className="disc">
                <Title>Description</Title>
                <Text>{disc}
                    <DemoLink href="/">demo</DemoLink>
                </Text>
            </Description>
        </Container>
    );
}

export default Article;

const Container = styled.div`
    width: 400px;  /* Make card wider */
    height: 280px; /* Adjust height to make it less tall */
    background-color: ${({ theme }) => theme.card}; 
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
    bottom: -120px; /* Start hidden at the bottom */
    left: 0;
    right: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.8));
    padding: 1rem;
    transition: bottom 400ms ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 120px; /* Ensure description box height matches hover position */
    &:hover {
        bottom: 0; /* Slide-up on hover */
    }
    ${Container}:hover & {
        bottom: 0; /* Ensure it shows when card is hovered */
    }
`;

const Title = styled.h1`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
`;

const Text = styled.p`
    font-size: 0.9rem;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 99};
`;

const DemoLink = styled.a`
    color: ${({ theme }) => theme.primary};
    margin-left: 0.4rem;
    font-weight: 500;
    text-decoration: underline;
    &:hover {
        color: ${({ theme }) => theme.primaryHover};
    }
`;
