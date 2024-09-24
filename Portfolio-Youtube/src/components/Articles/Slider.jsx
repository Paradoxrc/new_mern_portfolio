import React, { useRef } from 'react';
import Slider from 'react-slick';
import Article from './Article';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from 'styled-components';

let data = [
    {
        img: "/img1.png",
        disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!"
    },
    {
        img: "/img2.png",
        disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!"
    },
    {
        img: "/img3.png",
        disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!"
    },
    {
        img: "/img4.png",
        disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!"
    },
    {
        img: "/img5.jpg",
        disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!"
    }
];

var settings = {
    centerMode: true,
    centerPadding: '60px',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set autoplay interval to 2 seconds
    responsive: [
        {
            breakpoint: 990,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                centerMode: false,
                centerPadding: '0'
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                centerMode: false,
                centerPadding: '0'
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0'
            }
        }
    ]
};

const SliderComp = () => {
    const arrowRef = useRef(null);
    let sliderProject = data.map((item, i) => (
        <Article item={item} key={i} />
    ));

    return (
        <Container>
            <Slider ref={arrowRef} {...settings}>
                {sliderProject}
            </Slider>
            <Buttons>
                <button 
                    onClick={() => arrowRef.current.slickPrev()}
                    className='back'><IoIosArrowBack/></button>
                <button 
                    onClick={() => arrowRef.current.slickNext()}
                    className='next'><IoIosArrowForward/></button>
            </Buttons>
        </Container>
    );
}

export default SliderComp;

const Container = styled.div`
    position: relative;

    .slick-slide {
        padding: 0 100px; /* Add padding for horizontal space between slides */
    }

    .slick-list {
        margin: 0 -100px; /* Adjust margin to prevent overflow */
    }
`;

const Buttons = styled.div`
    button {
        width: 2rem;
        height: 2rem;
        background-color: rgba(255, 255, 255, 0.100);
        cursor: pointer;
        color: #01be96;
        border: none;
        position: absolute;
        top: 45%;
        right: -1rem;
    }

    .back {
        left: -1rem;
    }
`;
