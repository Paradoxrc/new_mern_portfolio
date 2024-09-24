import React, { useRef } from 'react';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from 'styled-components';

// Sample data (replace with your actual data fetching if necessary)
const data = [
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

const settings = {
  className: "center",
  centerMode: true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false
      }
    }
  ]
};

const SliderComponent = () => {
  const sliderRef = useRef(null);

  return (
    <SliderContainer>
      <Slider ref={sliderRef} {...settings}>
        {data.map((item, index) => (
          <Article key={index} item={item} />
        ))}
      </Slider>
      <NavButtons>
        <NavButton onClick={() => sliderRef.current.slickPrev()} className="prev">
          <IoIosArrowBack />
        </NavButton>
        <NavButton onClick={() => sliderRef.current.slickNext()} className="next">
          <IoIosArrowForward />
        </NavButton>
      </NavButtons>
    </SliderContainer>
  );
};

export default SliderComponent;

const SliderContainer = styled.div`
  position: relative;
`;

const NavButtons = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
`;

const NavButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #01be96;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  &.prev {
    left: -2rem;
  }

  &.next {
    right: -2rem;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Article = ({ item }) => {
  return (
    <ArticleWrapper>
      <img src={item.img} alt="Article" />
      <p>{item.disc}</p>
    </ArticleWrapper>
  );
};

const ArticleWrapper = styled.div`
  text-align: center;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  p {
    font-size: 14px;
    color: #333;
  }
`;
