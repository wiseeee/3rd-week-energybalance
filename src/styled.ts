import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 768px;
  margin: 0 auto;
`;

export const ItemList = styled.ul`
  padding: 0;
  border-bottom: 1px solid #e0e0e0;
  a {
    text-decoration: none;
    color: #000;
  }
`;

export const ItemWrap = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  position: relative;
  &:after {
    content: '>';
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translate(0, -50%);
  }
`;
export const ItemsName = styled.div`
  font-size: 18px;
`;
export const ItemsBrand = styled.div`
  color: gray;
  font-size: 14px;
  padding-bottom: 10px;
`;
