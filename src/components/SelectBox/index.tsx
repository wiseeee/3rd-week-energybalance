import React from 'react';
import * as S from './styled';

type Props = {
  selected: string;
  brands: string[];
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectBox: React.FC<Props> = ({ selected, brands, handleSelect }) => {
  return (
    <S.SelectBox onChange={handleSelect} value={selected}>
      <S.Option value="">--브랜드를 선택해주세요--</S.Option>
      {brands.map((name, index) => (
        <S.Option value={name} key={index}>
          {name}
        </S.Option>
      ))}
    </S.SelectBox>
  );
};

export default SelectBox;
