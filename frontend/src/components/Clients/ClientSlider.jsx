import React from 'react';
import styled from 'styled-components';
import { IoIosQuote } from "react-icons/io";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ClientSlider = (props) => {
    const { name, position, img, stars, desc } = props.item;
   
    const renderStars = () => {
        const starArray = [];
        for (let i = 0; i < 5; i++) {
            if (i < stars) {
                starArray.push(<AiFillStar key={i} className="star filled" />);
            } else {
                starArray.push(<AiOutlineStar key={i} className="star empty" />);
            }
        }
        return starArray;
    };

    return (
        <Container>
            <QuoteSection>
                <QuoteIcon>
                    <IoIosQuote />
                </QuoteIcon>
                <StarRating>
                    {renderStars()}
                </StarRating>
            </QuoteSection>
            
            <TestimonialText>
                "{desc}"
            </TestimonialText>
            
            <ClientInfo>
                <AvatarSection>
                    <Avatar src={img} alt={name} />
                </AvatarSection>
                <ClientDetails>
                    <ClientName>{name}</ClientName>
                    <ClientPosition>{position}</ClientPosition>
                </ClientDetails>
            </ClientInfo>
            
            <GradientBorder />
        </Container>
    );
}

export default ClientSlider;

const Container = styled.div`
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    margin: 0 10px;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        border-color: rgba(103, 126, 234, 0.3);
    }

    @media (max-width: 768px) {
        padding: 1.5rem;
        height: 320px;
        margin: 0 5px;
    }

    @media (max-width: 480px) {
        padding: 1.2rem;
        height: 300px;
    }
`;

const QuoteSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const QuoteIcon = styled.div`
    font-size: 3rem;
    color: #667eea;
    opacity: 0.6;
    line-height: 1;
`;

const StarRating = styled.div`
    display: flex;
    gap: 2px;
    
    .star {
        font-size: 1.2rem;
        
        &.filled {
            color: #ffd700;
        }
        
        &.empty {
            color: rgba(255, 255, 255, 0.3);
        }
    }

    @media (max-width: 480px) {
        .star {
            font-size: 1rem;
        }
    }
`;

const TestimonialText = styled.p`
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin: 1rem 0 1.5rem 0;
    flex: 1;
    font-style: italic;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media (max-width: 768px) {
        font-size: 0.9rem;
        margin: 0.8rem 0 1.2rem 0;
    }

    @media (max-width: 480px) {
        font-size: 0.85rem;
        margin: 0.6rem 0 1rem 0;
    }
`;

const ClientInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: auto;
`;

const AvatarSection = styled.div`
    position: relative;
`;

const Avatar = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid transparent;
    background: linear-gradient(135deg, #667eea, #764ba2);
    padding: 2px;
    transition: all 0.3s ease;

    ${Container}:hover & {
        transform: scale(1.1);
        box-shadow: 0 8px 20px rgba(103, 126, 234, 0.4);
    }

    @media (max-width: 768px) {
        width: 3.5rem;
        height: 3.5rem;
    }

    @media (max-width: 480px) {
        width: 3rem;
        height: 3rem;
    }
`;

const ClientDetails = styled.div`
    flex: 1;
    text-align: left;
`;

const ClientName = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 0.3rem 0;
    line-height: 1.2;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 0.95rem;
    }
`;

const ClientPosition = styled.p`
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    text-transform: capitalize;
    font-weight: 400;

    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

const GradientBorder = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    opacity: 0;
    transition: opacity 0.3s ease;

    ${Container}:hover & {
        opacity: 1;
    }
`;
