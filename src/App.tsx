import React, { useState, useEffect } from 'react';
import Search from './components/Search/index';
import Loading from './components/Loading/index';
import SelectBox from './components/SelectBox/index';
import View from './components/View/index';
import axios from 'axios';

const MOCK_URL = 'https://sixted-energybalance.herokuapp.com/';

const App: React.FC = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setError(null);
        setItems(null);
        setLoading(true);
        const response = await axios.get(MOCK_URL);
        setItems(response.data);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          return {
            message: `Things exploded (${err.message})`,
          };
        }
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target.value;
    setInput(target);
  };

  console.log(input);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!items) return null;
  return (
    <>
      <Loading></Loading>
      <Search input={input} onChange={(e) => onChange(e)}></Search>
      <SelectBox></SelectBox>
      <View></View>
    </>
  );
};

export default App;
