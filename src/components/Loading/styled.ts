import styled, { keyframes } from 'styled-components';

export const FlexBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingIcon = styled.img`
  animation: ${Rotate} 2s infinite linear;
  width: 64px;
  height: 64px;
`;
