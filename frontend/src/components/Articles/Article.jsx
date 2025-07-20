import React from 'react';
import styled from 'styled-components';
import { FaNewspaper, FaExternalLinkAlt } from 'react-icons/fa';

const Article = (props) => {
    const { title, img, desc, link } = props.item || {};

    return (
        <Container onClick={() => window.open(link, '_blank')}>
            <ImageSection>
                <Image src={img || "https://via.placeholder.com/400"} alt="article" />
                <ImageOverlay />
            </ImageSection>
            <ContentSection>
                <ArticleIcon>
                    <FaNewspaper />
                </ArticleIcon>
                <ArticleTitle>{title || "Article Title"}</ArticleTitle>
                <Description>{desc || "No description available."}</Description>
                <ReadMoreLink>
                    Read More <FaExternalLinkAlt size={12} />
                </ReadMoreLink>
            </ContentSection>
        </Container>
    );
}

export default Article;

const Container = styled.div`
    width: 350px;
    height: 450px;
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    position: relative;
    transition: all 0.4s ease-in-out;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        border-color: rgba(103, 126, 234, 0.3);
    }

    @media (max-width: 1024px) {
        width: 320px;
        height: 420px;
    }

    @media (max-width: 768px) {
        width: 300px;
        height: 400px;
    }

    @media (max-width: 480px) {
        width: 280px;
        height: 380px;
        margin: 0 auto;
    }
`;

const ImageSection = styled.div`
    height: 60%;
    position: relative;
    overflow: hidden;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease-in-out;

    ${Container}:hover & {
        transform: scale(1.1);
    }
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(103, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.4s ease-in-out;

    ${Container}:hover & {
        opacity: 1;
    }
`;

const ContentSection = styled.div`
    height: 40%;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.8);
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    @media (max-width: 768px) {
        padding: 1.2rem;
    }

    @media (max-width: 480px) {
        padding: 1rem;
    }
`;

const ArticleIcon = styled.div`
    color: #667eea;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    
    @media (max-width: 480px) {
        font-size: 1rem;
        margin-bottom: 0.3rem;
    }
`;

const ArticleTitle = styled.h1`
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.5rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 0.95rem;
        margin-bottom: 0.3rem;
    }
`;

const Description = styled.p`
    font-size: 0.85rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.4;
    margin-bottom: 0.8rem;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: 768px) {
        font-size: 0.8rem;
        -webkit-line-clamp: 2;
    }

    @media (max-width: 480px) {
        font-size: 0.75rem;
        margin-bottom: 0.5rem;
    }
`;

const ReadMoreLink = styled.div`
    color: #667eea;
    font-size: 0.85rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: all 0.3s ease;

    &:hover {
        color: #764ba2;
        transform: translateX(2px);
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;
