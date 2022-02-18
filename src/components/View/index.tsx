import React from 'react';
import { Items } from '../../App';
import * as S from './styled';
type Props = {
  view: Items[];
};

const View: React.FC<Props> = ({ view }) => {
  return (
    <S.ItemList>
      {view.map((item) => (
        <a href="#">
          <S.ItemWrap>
            <S.ItemsBrand>{item.브랜드}</S.ItemsBrand>
            <S.ItemsName>{item.제품명}</S.ItemsName>
          </S.ItemWrap>
        </a>
      ))}
    </S.ItemList>
  );
};
export default View;
