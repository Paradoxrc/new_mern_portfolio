import React from 'react';
import HeroBgAnimation from '../HeroBgAnimation';
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle, ResumeButton } from './HeroStyle';
import HeroImg from '../../images/HeroImage.png';
import Typewriter from 'typewriter-effect';
//import { Bio } from '../../data/constants';
import SocialIcons from '../Footer/SocialIcons';
import { useSelector } from 'react-redux'; // Import useSelector

const HeroSection = () => {
    // Corrected destructuring
    const { loading,portfolioData } = useSelector((state) => state.root);
    
    // Optional chaining to safely access 'intro' and 'name'
    const intro = portfolioData?.intro;
    const name = intro?.name ; // Fallback to Bio.name if intro or name is undefined
    const roles = intro?.roles;
    const description = intro?.description;
    const resume = intro?.resume;
    

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
                        <Title>Hi, I am <br /> {name}</Title> {/* Display name from portfolioData or fallback */}
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
                        <ResumeButton href={resume} target="display">Check Resume</ResumeButton>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">
                        <Img src={HeroImg} alt="hero-image" />
                    </HeroRightContainer>
                </HeroInnerContainer>
            </HeroContainer>
        </div>

        </div>
    );
};

export default HeroSection;
