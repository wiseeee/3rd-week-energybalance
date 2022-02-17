import React from 'react';
import Search from './components/Search/index';
import Loading from './components/Loading/index';
import SelectBox from './components/SelectBox/index';
import View from './components/View/index';
const a: string = 'hello world';

const App: React.FC = () => {
  return (
    <>
      <div className="App">{a} </div>
      <Loading></Loading>
      <Search></Search>
      <SelectBox></SelectBox>
      <View></View>
    </>
  );
};

export default App;
