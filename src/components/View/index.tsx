/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Items } from '../../App';
import * as S from './styled';
type Props = {
  view: Items[];
};

const View: React.FC<Props> = ({ view }) => {
  return (
    <S.ItemList>
      {view.map((item, index) => (
        <a href="#" key={index}>
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
