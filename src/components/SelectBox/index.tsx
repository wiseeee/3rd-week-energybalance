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
  recommend: Tag[];
  handleTagClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SelectBox: React.FC<Props> = ({
  selected,
  brands,
  handleSelect,
  recommend,
  handleTagClick,
}) => {
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
      <p>추천검색어</p>
      <S.KeywordWrap>
        {recommend.length ? (
          recommend.map((tag, index) => (
            <S.Keyword key={index} value={tag.tag} onClick={handleTagClick}>
              {`${tag.tag}`}
            </S.Keyword>
          ))
        ) : (
          <span>로드중..</span>
        )}
      </S.KeywordWrap>
    </>
  );
};

export default SelectBox;
