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
    centerMode: true,
    centerPadding: '60px',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '40px'
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '20px',
                dots: true
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: true
            }
        }
    ]
};


const Clients = () => {

    const { portfolioData } = useSelector((state) => state.root);

    const testimonials = portfolioData?.testimonial?.length > 0 ? portfolioData.testimonial : [
        { name: "John Michel",
            position: "web developer",
            img_url: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
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
                <Title>Client <span className="highlight">Testimonials</span></Title>
                <Desc>What clients say about my work and dedication</Desc>
            </Zoom>
            <Testimonials>
                <Slider ref={arrowRef} {...settings}>
                    {clientDisc}
                </Slider>
                <Buttons>
                    <button className="back" onClick={() => arrowRef.current.slickPrev()}><IoIosArrowBack /></button>
                    <button className="next" onClick={() => arrowRef.current.slickNext()}><IoIosArrowForward /></button>
                </Buttons>
            </Testimonials>
        </Container></div>
    );
};

export default Clients;

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

const Testimonials = styled.div`
    margin-top: 1rem;
    position: relative;
    padding: 2rem 0;

    .slick-slide {
        padding: 0 15px;
        transition: all 0.3s ease;
    }

    .slick-center {
        transform: scale(1.05);
        z-index: 2;
    }

    .slick-slide:not(.slick-center) {
        opacity: 0.8;
        transform: scale(0.95);
    }

    .slick-dots {
        bottom: -50px;
        
        li {
            margin: 0 5px;
            
            button {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                border: none;
                transition: all 0.3s ease;

                &:before {
                    display: none;
                }

                &:hover {
                    background: rgba(103, 126, 234, 0.7);
                    transform: scale(1.2);
                }
            }

            &.slick-active button {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                transform: scale(1.3);
            }
        }
    }

    .slick-list {
        margin: 0 -15px;
    }

    @media (max-width: 768px) {
        padding: 1rem 0;
        
        .slick-slide {
            padding: 0 10px;
        }
        
        .slick-list {
            margin: 0 -10px;
        }
        
        .slick-dots {
            bottom: -40px;
        }
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

const Buttons = styled.div`
    button {
        width: 3rem;
        height: 3rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;
        color: #667eea;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        z-index: 5;

        &:hover {
            background: rgba(103, 126, 234, 0.2);
            border-color: rgba(103, 126, 234, 0.4);
            transform: translateY(-50%) scale(1.1);
            color: #764ba2;
        }

        &:active {
            transform: translateY(-50%) scale(0.95);
        }

        &.next {
            right: -1.5rem;
        }

        &.back {
            left: -1.5rem;
        }

        @media (max-width: 768px) {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1rem;
            
            &.next {
                right: -1rem;
            }

            &.back {
                left: -1rem;
            }
        }

        @media (max-width: 530px) {
            display: none;
        }
    }
`;

const CardWrapper = styled.div`
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.3s ease;
`;