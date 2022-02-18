import React from 'react';
import { Items } from '../../App';
type Props = {
  view: Items[];
};

const View: React.FC<Props> = ({ view }) => {
  console.log(view);

  return (
    <div>
      {view.map((item) => (
        <div>{item.제품명}</div>
      ))}
    </div>
  );
};
export default View;
