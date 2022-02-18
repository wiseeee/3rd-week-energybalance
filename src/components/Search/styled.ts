import styled from 'styled-components';

export const Logo = styled.div`
  width: 100%;
  font-size: 36px;
  text-align: center;
`;

export const SearchWrap = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;
export const Input = styled.input`
  width: 100%;
  height: 48px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 2px;
  margin-right: 50px;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;
export const SubmitButton = styled.button`
  background-color: #e95a56;
  color: #fff;
  border: none;
  white-space: nowrap;
  padding: 0 40px;
`;
