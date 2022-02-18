import styled, { keyframes } from 'styled-components';

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
`;
