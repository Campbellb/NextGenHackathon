import styled from 'styled-components';

export const StyledProfilePicker = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  background-color: black;
`;

export const ProfileCard = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: darkgrey;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover,
  &.active {
    border: 2px solid #3498db;
  }

  input {
    display: none;
  }

  .profileDetails {
    margin-top: 10px;
    text-align: center;
  }
`;

export const Logo = styled.h1`
  font-size: 2rem;
  color: #3498db;
`;
