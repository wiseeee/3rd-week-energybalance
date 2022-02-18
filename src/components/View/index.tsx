import React from 'react';

type Props = {
  view: string;
};

const View: React.FC<Props> = ({ view }) => {
  return <div>{view}</div>;
};
export default View;
