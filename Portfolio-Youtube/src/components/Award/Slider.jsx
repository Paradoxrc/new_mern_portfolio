import React, { useRef } from 'react';
import Slider from 'react-slick';
import Award from './Award';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const settings = {
    centerMode: true,
    centerPadding: '60px',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoplay: true, 
    autoplaySpeed: 2000,
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
  const { portfolioData } = useSelector((state) => state.root);

  // Fallback data in case portfolioData is empty
  const awards = portfolioData?.award?.length > 0 ? portfolioData.award : [
    { img: "https://via.placeholder.com/400", desc: "Sample Article 1" },
    { img: "https://via.placeholder.com/400", desc: "Sample Article 2" },
    { img: "https://via.placeholder.com/400", desc: "Sample Article 3" }
  ];

  return (
    <Container>
      <Slider ref={arrowRef} {...settings}>
        {awards.map((item, i) => (
          <Award item={item} key={i} />
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
    
    .slick-slide {
        padding: 0 100px;
    }

    .slick-list {
        margin: 0 -100px;
    }

    @media (max-width: 990px) {
        .slick-slide {
            padding: 0 50px;
        }

        .slick-list {
            margin: 0 -50px;
        }
    }

    @media (max-width: 600px) {
        .slick-slide {
            padding: 0 20px;
        }

        .slick-list {
            margin: 0 -20px;
        }
    }

    @media (max-width: 480px) {
        .slick-slide {
            padding: 0 10px;
        }

        .slick-list {
            margin: 0 -10px;
        }
    }
`;

const Buttons = styled.div`
    button {
        width: 2rem;
        height: 2rem;
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;
        color: #01be96;
        border: none;
        position: absolute;
        top: 45%;
        right: -1rem;
        transition: background-color 0.3s ease;
    }

    .back {
        left: -1rem;
    }

    @media (max-width: 600px) {
        button {
            width: 1.5rem;
            height: 1.5rem;
        }

        .back {
            left: -0.5rem;
        }

        .next {
            right: -0.5rem;
        }
    }

    @media (max-width: 480px) {
        button {
            width: 1.2rem;
            height: 1.2rem;
        }

        .back {
            left: -0.3rem;
        }

        .next {
            right: -0.3rem;
        }
    }
`;
