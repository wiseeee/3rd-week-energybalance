/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Search from './components/Search/index';
import SelectBox from './components/SelectBox/index';
import View from './components/View/index';
import axios from 'axios';

const MOCK_URL = 'https://sixted-energybalance.herokuapp.com';
type Items = {
  제품명: string;
  브랜드: string | null;
};
const App: React.FC = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [view, setView] = useState('');
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selected, setSelected] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target.value;
    setInput(target);
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

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value;
    setSelected(target);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    changeSearchHistory();
    setInput('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        const brandsResponse = await axios.get(`${MOCK_URL}`);
        setBrands(brandsResponse.data.brands);
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
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setItems([]);
        setLoading(true);
        const response = await axios.get(
          `${MOCK_URL}/nutrients?keyword=${input}`,
        );
        const { data } = response;

        // 5개로 자르기
        const tmp = data.nutrients.slice(0, 5);

        setItems(tmp);

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
    fetchData();
  }, [input]);
  console.log(items);

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
        loading={loading}
        items={items}
        setView={setView}
      />
      <SelectBox
        selected={selected}
        handleSelect={handleSelect}
        brands={brands}
      />
      <View view={view} />
    </>
  );
};
export default App;
