import React from 'react';
import Loading from '../Loading';

interface Item {
  제품명: string;
  브랜드: string | null;
}
type Props = {
  loading: boolean;
  items: Item[];
};

const View: React.FC<Props> = ({ loading, items }) => {
  return (
    <>
      {items.map((item, index) => (
        <div key={index}>{item.제품명}</div>
      ))}
      {loading ? <Loading></Loading> : <div>asdf</div>}
    </>
  );
};
export default View;
