import React from 'react';
import Search from './components/Search/index';
import Loading from './components/Loading/index';
import SelectBox from './components/SelectBox/index';
const a: string = 'hello world';

const App: React.FC = () => {
  return (
    <>
      <div className="App">{a} </div>
      <Loading></Loading>
      <Search></Search>
      <SelectBox></SelectBox>
    </>
  );
};

export default App;
