import React, { useState } from 'react';
import * as S from './styled';

interface Item {
  제품명: string;
  브랜드: string | null;
}

type Props = {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    value?: string,
  ) => void;
  deleteSearchHistory: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => void;
  searchHistory: string[];
  loading: boolean;
  items: Item[];
  setInput: any;
};

const Search: React.FC<Props> = ({
  input,
  onChange,
  onSubmit,
  searchHistory,
  deleteSearchHistory,
  items,
  setInput,
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  const onFocus = () => setInputFocus(!inputFocus);

  return (
    <>
      <S.Logo>SIXTED</S.Logo>
      <S.SearchWrap onSubmit={onSubmit}>
        <S.Input
          type="text"
          placeholder="제품명, 브랜드를 검색하세요"
          value={input}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onFocus}
        />
        <S.SubmitButton type="submit">검색</S.SubmitButton>
        <S.RecommendBox inputFocus={inputFocus}>
          {searchHistory.map((search, index) => {
            return (
              <S.Recommend key={index}>
                <S.ItemName
                  onClick={(e) => {
                    onSubmit(e, search);
                  }}
                >
                  {search}
                </S.ItemName>
                <S.Xbtn onClick={(e) => deleteSearchHistory(e, index)}>
                  X
                </S.Xbtn>
              </S.Recommend>
            );
          })}
          {input.length !== 0 &&
            items.map((item, index) => (
              <S.Recommend key={index}>
                <S.ItemName
                  onClick={(e) => {
                    setInput(item.제품명);
                    onSubmit(e, item.제품명);
                  }}
                >
                  {item.제품명}
                </S.ItemName>
              </S.Recommend>
            ))}
        </S.RecommendBox>
      </S.SearchWrap>
    </>
  );
};

export default Search;
