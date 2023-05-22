import React, { useEffect, useState } from 'react';
import { Page, HeroSection, FeaturesSection, TitleBackground, FeatureCard, HeroSubtitle, RequestDemoButton, FeaturesTitle, Feature, CtaText, PageTitle, CTAButton } from './styles';
import ProfilePicker from '@/components/ProfilePicker';
import { roboto, inter, montserrat, openSans, oswald, merriweather } from '@/app/fonts';

const LandingPage = () => {
  const [activeProfile, setActiveProfile] = useState<any>(null);
  const [colorSchema, setColorSchema] = useState({
    primaryColor: '#1E90FF',
    descriptionColor: '#666',
    secondaryColor: '#FAFAFA',
    tertiaryColor: '#333',
    quaternaryColor: '#666',
    quinaryColor: '#eee',
    buttonColor: '#1E90FF',
    buttonTextColor: '#fff',
    pageContainerColor: '#FAFAFA'
  });
  const [pageText, setPageText] = useState({
    "pageTitle": "Unify",
    "heroSubtitle": "Unleash the full potential of your startup with our universal platform. Unify brings together diverse solutions under one roof, tailored to your needs, irrespective of size or domain.",
    "featuresTitle": "Why Partner with Unify?",
    "featureOne": "Tailored Dashboards - Unify provides a customizable dashboard for real-time data tracking and metrics, aiding in effective decision-making.",
    "featureTwo": "Collaboration Suite - Our platform includes communication and project management tools to enhance team collaboration and project delivery.",
    "featureThree": "Integration Capability - Unify seamlessly integrates with your existing tech stack, reducing disruption and simplifying adoption.",
    "ctaText": "Ready to unify your startup's growth journey?",
    "ctaButtonText": "Schedule a Free Consultation"
  });
  const [heroImage, setHeroImage] = useState('https://nycofficesuites.com/wp-content/uploads/2017/09/Office-team-working-in-meeting-room-for-rent-1.jpg');
  const [selectedFont, setSelectedFont] = useState<any>(inter);
  const [selectedFontStyles, setSelectedFontStyles] = useState<any>({})

  useEffect(() => {
    if (activeProfile) {
      (async () => {
        console.log('loading');
        const response = await fetch(
          "http://localhost:3000/api/content/landingPageData",
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userProfile: activeProfile }),
          }
        );
        const json = await response.json();
        console.log('json', json)
        setColorSchema(json.content.colorSchema)
        setPageText(json.content.pageText)
        const imageResponse = await fetch(
          "http://localhost:3000/api/content/image",
          {
            method: 'POST',
            body: JSON.stringify({ prompt: json.content.image_prompt })
          }
        );
        const imageJson = await imageResponse.json();
        setHeroImage(imageJson.image);
      })();
    }
  }, [activeProfile])

  useEffect(() => {
    if (activeProfile)
      if (activeProfile.age >= 0 && activeProfile.age <= 18) {
        setSelectedFont(openSans)
        setSelectedFontStyles({})
      } else if (activeProfile.age >= 19 && activeProfile.age <= 24) {
        setSelectedFont(oswald)
        setSelectedFontStyles({ fontSize: '16px', lineHeight: 1.5 })
      } else if (activeProfile.age >= 25 && activeProfile.age <= 34) {
        setSelectedFont(inter)
        setSelectedFontStyles({ fontSize: '16px', lineHeight: 1.6 })
      } else if (activeProfile.age >= 35 && activeProfile.age <= 49) {
        setSelectedFont(roboto)
        setSelectedFontStyles({ fontSize: '18px', lineHeight: 1.6 })
      } else if (activeProfile.age >= 50) {
        setSelectedFont(montserrat)
        setSelectedFontStyles({ fontSize: '20px', lineHeight: 1.6 })
      }
  }, [pageText])

  const handleSelectProfile = (profile) => setActiveProfile(profile)
  const handleRequestDemoClick = () => { };

  return (
    <>
    <ProfilePicker onProfileChange={(profile) => handleSelectProfile(profile)} />
      <div className={selectedFont.className} style={{ ...selectedFontStyles, height: '100vh' }}>
    <Page style={{ backgroundColor: colorSchema.quinaryColor }}>
      <HeroSection style={{ backgroundImage: `url(${heroImage})` }}>
        <TitleBackground style={{ color: colorSchema.tertiaryColor }}>
          <PageTitle style={{ color: colorSchema.primaryColor }}>{pageText.pageTitle}</PageTitle>
            <HeroSubtitle>
            {pageText.heroSubtitle}
          </HeroSubtitle>
              <RequestDemoButton onClick={handleRequestDemoClick} style={{ backgroundColor: colorSchema.buttonColor, color: colorSchema.buttonTextColor }}>
            {pageText.ctaButtonText}
          </RequestDemoButton>
        </TitleBackground>
      </HeroSection>

      <FeaturesTitle style={{ color: colorSchema.primaryColor }}>{pageText.featuresTitle}</FeaturesTitle>
      <FeaturesSection>
        <FeatureCard style={{ color: colorSchema.pageContainerColor }}>
          <Feature style={{ color: colorSchema.descriptionColor }}>{pageText.featureOne}</Feature>
        </FeatureCard>
        <FeatureCard style={{ color: colorSchema.pageContainerColor }}>
          <Feature style={{ color: colorSchema.descriptionColor }}>{pageText.featureTwo}</Feature>
        </FeatureCard>
        <FeatureCard style={{ color: colorSchema.pageContainerColor }}>
          <Feature style={{ color: colorSchema.descriptionColor }}>{pageText.featureThree}</Feature>
        </FeatureCard>
      </FeaturesSection>

      <CtaText style={{ color: colorSchema.primaryColor, textAlign: 'center', fontSize: '2em' }}>{pageText.ctaText}</CtaText>
      <CTAButton style={{ backgroundColor: colorSchema.buttonColor, color: colorSchema.buttonTextColor }}>Contact Us</CTAButton>
    </Page>
      </div>
    </>
  );
};

export default LandingPage;
