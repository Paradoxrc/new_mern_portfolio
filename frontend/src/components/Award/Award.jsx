import React from 'react';
import styled from 'styled-components';

const Award = (props) => {
    const { img, desc, title } = props.item || {}; // Safeguard props.item

    return (
        <Container>
            <ImageSection>
                <Image src={img || "https://via.placeholder.com/400"} alt="award" />
                <ImageOverlay />
            </ImageSection>
            <ContentSection>
                <AwardIcon>🏆</AwardIcon>
                {/* <AwardTitle>{title || "Achievement"}</AwardTitle> */}
                <Description>{desc || "No description available."}</Description>
            </ContentSection>
        </Container>
    );
}

export default Award;

const Container = styled.div`
    width: 380px;
    height: 320px;
    background: ${({ theme }) => theme.card || "#1A1A2E"};
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    position: relative;
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(133, 76, 230, 0.3);
        border-color: rgba(133, 76, 230, 0.5);
    }

    @media (max-width: 1024px) {
        width: 320px;
        height: 280px;
    }

    @media (max-width: 768px) {
        width: 300px;
        height: 260px;
    }

    @media (max-width: 480px) {
        width: 280px;
        height: 240px;
        margin: 0 auto;
    }
`;

const ImageSection = styled.div`
    position: relative;
    width: 100%;
    height: 60%;
    overflow: hidden;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;

    ${Container}:hover & {
        transform: scale(1.05);
    }
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.3) 70%,
        rgba(0, 0, 0, 0.6) 100%
    );
`;

const ContentSection = styled.div`
    padding: 20px;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: ${({ theme }) => theme.card || "#1A1A2E"};
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 768px) {
        padding: 16px;
    }

    @media (max-width: 480px) {
        padding: 12px;
    }
`;

const AwardIcon = styled.div`
    font-size: 2rem;
    margin-bottom: 8px;
    filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));

    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 6px;
    }
`;

const AwardTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary || "#FFFFFF"};
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 6px;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
        margin-bottom: 4px;
    }
`;

const Description = styled.p`
    font-size: 0.9rem;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary || "#B3B3B3"};
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 0.8rem;
        -webkit-line-clamp: 2;
    }

    @media (max-width: 480px) {
        font-size: 0.75rem;
        -webkit-line-clamp: 2;
    }
`;
