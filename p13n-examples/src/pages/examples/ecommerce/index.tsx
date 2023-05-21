import React, { useEffect, useState } from 'react';
import * as S from './styles';
import ProfilePicker from '@/components/ProfilePicker';
import { roboto, inter, montserrat, openSans, oswald, merriweather } from '@/app/fonts';

const ProductPage = () => {
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [activeProfile, setActiveProfile] = useState<any>(null);
  const [productSpec, setProductSpec] = useState<any>({
    title: "Stylish Swim Trunks",
    description: "These stylish swim trunks are perfect for your summer outings. Made with high quality material, they offer both comfort and durability.Available in different sizes and colors.",
    sizes: "S",
    colors: "blue",
    colorSchema: {
      backgroundColor: '#eee',
      pageContainerColor: '#FAFAFA',
      titleColor: '#333',
      descriptionColor: '#666',
      buttonColor: '#1E90FF',
      buttonHoverColor: '#2388D1',
      buttonTextColor: '#fff'
    }
  });
  const [productImages, setProductImages] = useState<any>([  'https://cdn.shopify.com/s/files/1/0141/1868/2688/products/4.5InchShortSwimTrunksSlimFit-HazeBlue_1024x.jpg?v=1657781757' ]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedFont, setSelectedFont] = useState<any>(inter);
  const [selectedFontStyles, setSelectedFontStyles] = useState<any>({})
  const [colorSchema, setColorSchema] = useState<any>({
    backgroundColor: '#eee',
    pageContainerColor: '#FAFAFA',
    titleColor: '#333',
    descriptionColor: '#666',
    buttonColor: '#1E90FF',
    buttonHoverColor: '#2388D1',
    buttonTextColor: '#fff'
  });
  const [hover, setHover] = useState(false);

  const handleSizeChange = (e) => setSize(e.target.value)
  const handleColorChange = (e) => setColor(e.target.value);
  const handleBuyClick = () => {};
  const handleSelectProfile = (profile) => setActiveProfile(profile)
  const nextImage = () => setCurrentImageIndex((currentImageIndex + 1) % productImages.length)
  const prevImage = () => setCurrentImageIndex((currentImageIndex - 1 + productImages.length) % productImages.length)
  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)


  useEffect(() => {
    if (activeProfile) {
        (async () => {
        const response = await fetch(
          "http://localhost:3000/api/content/create",
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userProfile: activeProfile }),
          }
        );
        const json = await response.json();
        console.log('json', json)
        setProductSpec(json.content)
          const imageResponse = await fetch(
            "http://localhost:3000/api/content/image",
            {
              method: 'POST',
              body: JSON.stringify({ prompt: json.content.image_prompt })
            }
          );
          const imageJson = await imageResponse.json();
          setProductImages(imageJson.image.map((imgObj) => imgObj.url));
          setCurrentImageIndex(0);
      })();
    }
  }, [activeProfile])

  useEffect(() => {
    setSize(productSpec.size)
    setColor(productSpec.color)
    setColorSchema(productSpec.colorSchema)
    if(activeProfile)
      if (activeProfile.age >= 0 && activeProfile.age <= 18) {
        setSelectedFont(openSans)
        setSelectedFontStyles({})
      } else if (activeProfile.age >= 19 && activeProfile.age <= 24) {
        setSelectedFont(oswald)
        setSelectedFontStyles({fontSize: '16px', lineHeight: 1.5})
      } else if (activeProfile.age >= 25 && activeProfile.age <= 34) {
        setSelectedFont(inter)
        setSelectedFontStyles({fontSize: '16px', lineHeight: 1.6})
      } else if (activeProfile.age >= 35 && activeProfile.age <= 49) {
        setSelectedFont(roboto)
        setSelectedFontStyles({fontSize: '18px', lineHeight: 1.6})
      } else if (activeProfile.age >= 50) {
        setSelectedFont(montserrat)
        setSelectedFontStyles({fontSize: '20px', lineHeight: 1.6})
      }
  }, [productSpec])

  return (
    <>
      <ProfilePicker onProfileChange={(profile) => handleSelectProfile(profile)} />
      <div className={selectedFont.className} style={{ ...selectedFontStyles, height: '100vh', backgroundColor: colorSchema.backgroundColor, paddingTop: '5rem'}}>
        <S.PageContainer style={{ background: colorSchema.pageContainerColor }}>
            <S.ProductImageContainer>
              <S.PreviousButton onClick={prevImage}>&lt;</S.PreviousButton>
              <S.ProductImage src={productImages[currentImageIndex]} alt="Product" />
              <S.NextButton onClick={nextImage}>&gt;</S.NextButton>
            </S.ProductImageContainer>
          <S.ProductInfoContainer>
              <S.ProductTitle style={{ color: colorSchema.titleColor }}>{productSpec.title}</S.ProductTitle>
            <S.ProductDescription style={{ color: colorSchema.descriptionColor }} >
                {productSpec.description}
            </S.ProductDescription>
            <S.SelectContainer>
              <S.SizeSelect value={size} onChange={handleSizeChange}>
                <option value="">Select size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </S.SizeSelect>
              <S.ColorSelect value={color} onChange={handleColorChange}>
                <option value="">Select color</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
              </S.ColorSelect>
            </S.SelectContainer>
            <S.BuyButton onClick={handleBuyClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ backgroundColor: hover ? colorSchema.buttonHoverColor : colorSchema.buttonColor, color: colorSchema.buttonTextColor }}>Buy Now</S.BuyButton>
          </S.ProductInfoContainer>
        </S.PageContainer>
        <ul>
        {productSpec.recommendedProducts && <S.PageContainer style={{ background: colorSchema.pageContainerColor }}>
          {productSpec.recommendedProducts.map((product) => <li style={{ textDecoration: 'none' }}>{product.title}<br/>{product.description}</li>)}
        </S.PageContainer>
        }
        </ul>
      </div>
    </>
  );
};

export default ProductPage;
