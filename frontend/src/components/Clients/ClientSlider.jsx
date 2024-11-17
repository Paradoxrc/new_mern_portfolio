import React from 'react';
import styled from 'styled-components';
import { IoIosQuote } from "react-icons/io";
import { AiOutlineStar } from "react-icons/ai";

const ClientSlider = (props) => {
    const { name, position, img_url, stars, disc } = props.item;
    return (
        <Container>
            <Header>
                <span className='quote'><IoIosQuote /></span>
                <div>
                    {Array(stars).fill().map((_, i) => (
                        <span className='star' key={i}>
                            <AiOutlineStar />
                        </span>
                    ))}
                </div>
            </Header>
            <Desc>
                {disc}
            </Desc>
            <Footer>
                <img src={img_url} alt={name} />
                <div className="details">
                    <h1>{name}</h1>
                    <p>{position}</p>
                </div>
            </Footer>
        </Container>
    );
}

export default ClientSlider;

const Container = styled.div`
    background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
    padding: 2rem;
    margin: 0 1rem;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 100%; /* Ensures it doesn't exceed parent width */
    width: 100%; /* Full width of the parent */

    .slick-slide {
        padding: 0 20px; /* Adjusted padding to prevent overflow */
    }

    .slick-list {
        margin: 0;
    }

    @media (max-width: 768px) {
        padding: 1.5rem;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .quote {
        font-size: 3rem;
        color: #6699ff;
        opacity: 0.7;
    }

    .star {
        color: #6699ff;
        font-size: 1.3rem;
    }
`;

const Desc = styled.p`
    font-size: 1rem;
    color: ${({ theme }) => theme.text_secondary};
    max-width: 100%; /* Prevents text from overflowing */
    word-wrap: break-word; /* Ensures long words break correctly */
    margin: 1rem auto;
    padding: 1rem 0;
    
    @media (max-width: 500px) {
        width: 100%; /* Adjust width for small screens */
        font-size: 0.9rem;
    }
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap; /* Allows items to wrap if needed */

    img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    .details {
        h1 {
            font-size: 1.2rem;
            font-weight: 700;
            color: #fff;
            margin: 0;

            @media (max-width: 580px) {
                font-size: 1rem;
            }

            @media (max-width: 538px) {
                font-size: 0.9rem;
            }
        }

        p {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
            margin: 0;

            @media (max-width: 538px) {
                font-size: 0.6rem;
            }
        }
    }
`;
