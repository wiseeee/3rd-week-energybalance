import React from 'react';
import * as S from './styled';

type Props = {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteSearchHistory: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => void;
  searchHistory: string[];
};

const Search: React.FC<Props> = (props) => {
  const { input, onChange, onSubmit, searchHistory, deleteSearchHistory } =
    props;

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
    </>
  );
};

export default Search;
