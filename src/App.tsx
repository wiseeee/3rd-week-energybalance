import React, { useState, useEffect } from 'react';
import Search from './components/Search/index';
import Loading from './components/Loading/index';
import SelectBox from './components/SelectBox/index';
import View from './components/View/index';
import axios from 'axios';

const MOCK_URL = 'https://sixted-energybalance.herokuapp.com';

const App: React.FC = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setError(null);
        setItems(null);
        setLoading(true);
        const response = await axios.get(`${MOCK_URL}/nutrients`);
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
  console.log(items);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target.value;
    setInput(target);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    changeSearchHistory();
    setInput('');
  };

  const deleteSearchHistory = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ): void => {
    const temp = [...searchHistory];
    temp.splice(index, 1);
    setSearchHistory(temp);
  };

  const changeSearchHistory = () => {
    if (searchHistory.length < 10) {
      setSearchHistory([input, ...searchHistory]);
    } else {
      const tmp = [...searchHistory];
      tmp.pop();
      setSearchHistory([input, ...tmp]);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!items) return null;
  return (
    <>
      <Search
        input={input}
        onChange={onChange}
        onSubmit={onSubmit}
        searchHistory={searchHistory}
        deleteSearchHistory={deleteSearchHistory}
      />
      <SelectBox />
      <View />
    </>
  );
};

export default App;
