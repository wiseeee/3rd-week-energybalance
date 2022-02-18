import React from 'react';
import Loading from '../Loading';
import * as S from './styled';

interface Item {
  제품명: string;
  브랜드: string | null;
}

type Props = {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteSearchHistory: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => void;
  searchHistory: string[];
  loading: boolean;
  items: Item[];
  setView: (value: string) => any;
};

const Search: React.FC<Props> = ({
  input,
  onChange,
  onSubmit,
  searchHistory,
  deleteSearchHistory,
  loading,
  items,
  setView,
}) => {
  const handleAutoCompleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string,
  ) => setView(value);

  return (
    <>
      <S.Logo>6티드</S.Logo>
      {searchHistory.map((search, index) => {
        return (
          <div key={index}>
            {search}
            <button onClick={(e) => deleteSearchHistory(e, index)}>X</button>
          </div>
        );
      })}
      <form onSubmit={onSubmit}>
        <S.Input
          type="text"
          placeholder="검색하세요"
          value={input}
          onChange={onChange}
        />
        <button type="submit">제출</button>
      </form>
      <>
        {items.map((item, index) => (
          <div key={index}>
            {/* div onclick ?? 실패 */}
            <button onClick={(e) => handleAutoCompleteClick(e, item.제품명)}>
              {item.제품명}
            </button>
          </div>
        ))}
        {loading ? <Loading></Loading> : <div>asdf</div>}
      </>
    </>
  );
};

export default Search;
