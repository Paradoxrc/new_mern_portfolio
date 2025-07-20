import React, { useRef } from 'react';
import Slider from 'react-slick';
import Article from './Article';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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
    autoplaySpeed: 3000,
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

const SliderComp = () => {
  const arrowRef = useRef(null);
  const { portfolioData } = useSelector((state) => state.root);

  // Check if portfolioData is loading correctly
  console.log('portfolioData:', portfolioData);

  // Fallback data in case portfolioData is empty
  const articles = portfolioData?.article?.length > 0 ? portfolioData.article : [
    { img: "https://via.placeholder.com/400", desc: "Sample Article 1" },
    { img: "https://via.placeholder.com/400", desc: "Sample Article 2" },
    { img: "https://via.placeholder.com/400", desc: "Sample Article 3" }
  ];

  return (
    <Container>
      <Slider ref={arrowRef} {...settings}>
        {articles.map((item, i) => (
          <Article item={item} key={i} />
        ))}
      </Slider>
      <Buttons>
        <button onClick={() => arrowRef.current.slickPrev()} className='back'><IoIosArrowBack/></button>
        <button onClick={() => arrowRef.current.slickNext()} className='next'><IoIosArrowForward/></button>
      </Buttons>
    </Container>
  );
}

export default SliderComp;

const Container = styled.div`
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
        opacity: 0.7;
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
    }
`;
