import React from 'react';
import * as S from './styled';

type Props = {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<Props> = (props) => {
  const { input, onChange } = props;
  return (
    <>
      <S.Logo>6티드</S.Logo>
      <S.Input
        type="text"
        placeholder="검색하세요"
        value={input}
        onChange={onChange}
      ></S.Input>
    </>
  );
};

export default Search;
