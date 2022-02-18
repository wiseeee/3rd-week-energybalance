import React from 'react';
import Loading from '../Loading';

type Props = {
  loading: boolean;
};

const View: React.FC<Props> = ({ loading }) => {
  return <>{loading ? <Loading></Loading> : <div>asdf</div>}</>;
};
export default View;
