import React from 'react';
import { Items } from '../../App';
type Props = {
  view: Items[];
};

const View: React.FC<Props> = ({ view }) => {
  console.log(view);

  return <div>View</div>;
};
export default View;
