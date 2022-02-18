/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Search from './components/Search/index';
import SelectBox from './components/SelectBox/index';
import View from './components/View/index';
import axios from 'axios';
import Loading from './components/Loading';

const MOCK_URL = 'https://sixted-energybalance.herokuapp.com';
export type Items = {
  제품명: string;
  브랜드: string | null;
};
const App: React.FC = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [view, setView] = useState([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  async function GetData(API_ADDRESS: string) {
    setLoading(true);
    const response = await axios.get(API_ADDRESS);
    setLoading(false);
    return response.data;
  }

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

  const changeSearchHistory = (value = '') => {
    if (searchHistory.length < 10) {
      setSearchHistory([value || input, ...searchHistory]);
    } else {
      const tmp = [...searchHistory];
      tmp.pop();
      setSearchHistory([value || input, ...tmp]);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value;
    setSelected(target);
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    value = '',
  ) => {
    e.preventDefault();
    changeSearchHistory(value || input);
    const response = await GetData(
      `${MOCK_URL}/nutrients?keyword=${value || input}`,
    );
    setView(response.nutrients);
    setInput('');
    setCurrentValue(value || input);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await GetData(
        `${MOCK_URL}/nutrients?keyword=${currentValue}&brand=${selected}`,
      );
      setView(res.nutrients);
    };
    getData();
  }, [selected]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const brandsResponse = await GetData(MOCK_URL);
        setBrands(brandsResponse.brands);
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
        const response = await GetData(
          `${MOCK_URL}/nutrients?keyword=${input}`,
        );
        // 5개로 자르기
        const tmp = response.nutrients.slice(0, 5);
        setItems(tmp);
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
        setInput={setInput}
      />
      <SelectBox
        selected={selected}
        handleSelect={handleSelect}
        brands={brands}
      />
      {loading ? <Loading /> : <View view={view} />}
    </>
  );
};
export default App;
