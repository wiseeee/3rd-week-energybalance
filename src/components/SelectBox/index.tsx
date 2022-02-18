import React from 'react';
import * as S from './styled';

interface Tag {
  tag: string;
  count: number;
}

type Props = {
  selected: string;
  brands: string[];
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleOnClick: () => void;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    value?: string,
  ) => void;
  recommend: Tag[];
};

const SelectBox: React.FC<Props> = ({
  selected,
  brands,
  handleSelect,
  recommend,
  onSubmit,
}) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit(e, e.currentTarget.value);
  };
  return (
    <>
      <S.SelectBox onChange={handleSelect} value={selected}>
        <S.Option value="">--브랜드를 선택해주세요--</S.Option>
        {brands.map((name, index) => (
          <S.Option value={name} key={index}>
            {name}
          </S.Option>
        ))}
      </S.SelectBox>
      <ul>
        {recommend.map((tag) => (
          <button
            value={tag.tag}
            onClick={handleOnClick}
          >{`${tag.tag} (${tag.count})`}</button>
        ))}
      </ul>
    </>
  );
};

export default SelectBox;
