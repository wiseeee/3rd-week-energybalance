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
  position: relative;
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

export const RecommendBox = styled.ul`
  position: absolute;
  top: 36px;
  padding: 0;
  background-color: #ffffff;
  width: 100%;
  z-index: 1;
  box-shadow: 0px 0px 5px -2px #000000;
  display: ${(props: { inputFocus: boolean }) =>
    props.inputFocus ? 'block' : 'none'};
`;
export const Recommend = styled.li`
  list-style: none;
  padding: 4px;
  margin: 4px;
  background-color: #ffffff;
  border-bottom: 1px solid #cccccc;
`;

export const ItemName = styled.button`
  background-color: #ffffff;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

export const Xbtn = styled.button`
  padding: 2px 4px;
  margin-left: 4px;
  border-radius: 50%;
  border: none;
  background-color: #dddddd;
  color: #333333;
  cursor: pointer;
`;
