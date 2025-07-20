import React from 'react';
import HeroBgAnimation from '../HeroBgAnimation';
import {
  HeroContainer,
  HeroBg,
  HeroLeftContainer,
  Img,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Span,
  SubTitle,
  ResumeButton,
  TrustedByContainer,
  TrustedByText,
  FiverrLogo
} from './HeroStyle';
import HeroImg from '../../images/HeroImage.png';
import Typewriter from 'typewriter-effect';
import SocialIcons from '../Footer/SocialIcons';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);
  
  const intro = portfolioData?.intro;
  const name = intro?.name;
  const roles = intro?.roles;
  const description = intro?.description;
  const resume = intro?.resume;
  const profileImage = intro?.profileImage;
  const FiverrLogoImg = 'https://logos-world.net/wp-content/uploads/2020/12/Fiverr-Logo.png'; // Using external Fiverr logo URL
  
  // Helper function to get the full image URL
  const getImageUrl = (url) => {
    if (!url) return '';
    // If it's already a full URL (Cloudinary), return as-is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // If it's a local path, prepend localhost
    return `http://localhost:10000${url}`;
  };
  
  return (
    <div>
      <div id="about">
        <HeroContainer>
          <SocialIcons />
          <HeroBg>
            <HeroBgAnimation />
          </HeroBg>
          <HeroInnerContainer>
            <HeroLeftContainer id="Left">
              <Title>Hi, I am <br /> {name}</Title>
              <TextLoop>
                I am a
                <Span>
                  <Typewriter
                    options={{
                      strings: roles,
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </Span>
              </TextLoop>
              <SubTitle>{description}</SubTitle>
              
              {/* Trusted by Fiverr Section */}
              <TrustedByContainer>
                <TrustedByText>Trusted by</TrustedByText>
                <FiverrLogo src={FiverrLogoImg} alt="Fiverr Logo" />
              </TrustedByContainer>
              
              <ResumeButton href={resume} target="display">Check Resume</ResumeButton>
            </HeroLeftContainer>
            
            <HeroRightContainer id="Right">
              <Img 
                src={profileImage ? getImageUrl(profileImage) : HeroImg} 
                alt="hero-image" 
              />
            </HeroRightContainer>
          </HeroInnerContainer>
        </HeroContainer>
      </div>
    </div>
  );
};

export default HeroSection;