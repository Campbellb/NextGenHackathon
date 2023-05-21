import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export const ProductImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`;

export const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;


export const NextButton = styled.button`
  position: absolute;
  right: 10px;
`;

export const PreviousButton = styled.button`
  position: absolute;
  left: 10px;
`;

export const ProductInfoContainer = styled.div`
  flex: 2;
  padding: 20px;
`;

export const ProductTitle = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

export const ProductDescription = styled.p`
  font-size: 1.2em;
  line-height: 1.5;
  margin-bottom: 30px;
`;

export const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const SizeSelect = styled.select`
  width: 45%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
`;

export const ColorSelect = styled.select`
  width: 45%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
`;

export const BuyButton = styled.button`
  color: white;
  padding: 15px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
  width: 100%;
  transition: background-color 0.2s;
`;
