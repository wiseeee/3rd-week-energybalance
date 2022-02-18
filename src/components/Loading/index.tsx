import React from 'react';
import * as S from './styled';

const Loading: React.FC = () => {
  return (
    <S.FlexBox>
      <S.LoadingIcon src="images/icon_pill.png" />
    </S.FlexBox>
  );
};

export default Loading;
