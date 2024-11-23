import React, { useRef } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import ClientSlider from './ClientSlider';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Zoom } from 'react-awesome-reveal';
import { useSelector } from 'react-redux';

let clients = [
    {
        name: "John Michel",
        position: "web developer",
        img_url: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
        stars: 3,
        disc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Temporibus consequuntur dolores labore natus similique nemo doloribus cum accusantium adipisci maiores.`
    },
    {
        name: "John Michel",
        position: "web developer",
        img_url: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
        stars: 4,
        disc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Temporibus consequuntur dolores labore natus similique nemo doloribus cum accusantium adipisci maiores.`
    },
    {
        name: "John Michel",
        position: "web developer",
        img_url: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
        stars: 5,
        disc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Temporibus consequuntur dolores labore natus similique nemo doloribus cum accusantium adipisci maiores.`
    },
    {
        name: "John Michel",
        position: "web developer",
        img_url: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
        stars: 5,
        disc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Temporibus consequuntur dolores labore natus similique nemo doloribus cum accusantium adipisci maiores.`
    },
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
        {
            breakpoint: 990,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
            }
        },
        {
            breakpoint: 530,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};


const Clients = () => {

    const { portfolioData } = useSelector((state) => state.root);

const testimonials = portfolioData?.testimonial?.length > 0 ? portfolioData.testimonial : [
    { name: "John Michel",
        position: "web developer",
        img_url: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpgs",
        stars: 3,
        disc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Temporibus consequuntur dolores labore natus similique nemo doloribus cum accusantium adipisci maiores.`},
   
  ];

    const arrowRef = useRef(null);
    let clientDisc = testimonials.map((item, i) => (
        <CardWrapper key={i}>
            <ClientSlider item={item} />
        </CardWrapper>
    ));
    
    return (
        <div id='testimonials'>
        <Container id='client'>
            <Zoom>
                <Title>Testimonials</Title>
                <Desc>What clients say about me</Desc>
            </Zoom>
            <Testimonials>
                <Slider ref={arrowRef} {...settings}>
                    {clientDisc}
                </Slider>
                <Buttons>
                    <button onClick={() => arrowRef.current.slickPrev()}><IoIosArrowBack /></button>
                    <button onClick={() => arrowRef.current.slickNext()}><IoIosArrowForward /></button>
                </Buttons>
            </Testimonials>
        </Container></div>
    );
};

export default Clients;

const Container = styled.div`
    width: 80%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 4rem 0;
    text-align: center; /* Center align content */
    
    @media (max-width: 840px) {
        width: 90%;
    }
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary}; /* Primary text color */
    margin-bottom: 1rem;
    text-align: center; /* Center the title */

    .highlight {
        color: #739efe; /* Matches the color of TimelineConnector */
    }

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Testimonials = styled.div`
    margin-top: 2rem;
    position: relative;
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

const Buttons = styled.div`
    position: absolute;
    right: 0.7rem;
    bottom: -2rem;

    button {
        background-color: transparent;
        margin-left: 0.5rem;
        border: none;
        color: #01be96;
        cursor: pointer;
        font-size: 1.1rem;
    }

    @media (max-width: 530px) {
        display: none;
    }
`;

const CardWrapper = styled.div`
    border-radius: 15px; /* Adds border radius to the card */
    overflow: hidden;
`;
