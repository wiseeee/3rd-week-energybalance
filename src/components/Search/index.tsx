import React from 'react';
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
  loading,
  items,
  setInput,
}) => {
  return (
    <>
      <S.Logo>6티드</S.Logo>
      <form onSubmit={onSubmit}>
        <S.Input
          type="text"
          placeholder="제품명, 브랜드를 검색하세요"
          value={input}
          onChange={onChange}
        />
        <button type="submit">제출</button>
      </form>
      {searchHistory.map((search, index) => {
        return (
          <div key={index}>
            <button
              onClick={(e) => {
                onSubmit(e, search);
              }}
            >
              {search}
            </button>
            <button onClick={(e) => deleteSearchHistory(e, index)}>X</button>
          </div>
        );
      })}
      {input.length !== 0 &&
        items.map((item, index) => (
          <div key={index}>
            {/* div onclick ?? 실패 */}
            <button
              onClick={(e) => {
                setInput(item.제품명);
                onSubmit(e, item.제품명);
              }}
            >
              {item.제품명}
            </button>
          </div>
        ))}
    </>
  );
};

export default Search;
