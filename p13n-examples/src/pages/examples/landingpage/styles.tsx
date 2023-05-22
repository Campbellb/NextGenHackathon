import styled from 'styled-components';

export const Page = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HeroSection = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const TitleBackground = styled.div`
  background-color: ${props => props.color}80; //Slightly transparent background color
  backdrop-filter: blur(10px); //This will blur the background under the div
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  display: inline-block; //Ensures that the background wraps around the content
`;


export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PageTitle = styled.h1`
  font-size: 2.5em;
  text-align: center;
`;

export const HeroSubtitle = styled.h2`
  font-size: 1.5em;
  text-align: center;
`;

export const RequestDemoButton = styled.button`
  font-size: 1em;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

export const FeaturesTitle = styled.h2`
  font-size: 2em;
  text-align: center;
  margin-top: 40px;
`;

export const FeaturesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
`;

export const FeatureCard = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  width: 300px;
  margin: 20px;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    transform: translateY(-10px);
  }
`;

export const Feature = styled.p`
  font-size: 1em;
  text-align: justify;
`;

export const CtaText = styled.h2`
  font-size: 1.5em;
  text-align: center;
  margin-top: 40px;
`;

export const CTAButton = styled.button`
  padding: 8px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
  width: 10%;
  transition: background-color 0.2s;
`;