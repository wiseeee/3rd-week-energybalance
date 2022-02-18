import React, { useState, useEffect } from 'react';
import Search from './components/Search/index';
import Loading from './components/Loading/index';
import SelectBox from './components/SelectBox/index';
import View from './components/View/index';
import axios from 'axios';

const MOCK_URL = 'https://sixted-energybalance.herokuapp.com';
type Items = {
  제품명: string;
  브랜드: string | null;
};
const App: React.FC = () => {
  const [views, setViews] = useState<Items[]>([]);
  const [items, setItems] = useState<Items[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setItems([]);
        setLoading(true);
        const response = await axios.get(`${MOCK_URL}`);
        const brandsResponse = await axios.get(`${MOCK_URL}/nutrients`);
        const { data } = response;
        setItems(data);
        setViews(data);
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

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value;
    setSelected(target);
    if (target) {
      const filteredItems = items.filter((item) => item.브랜드 === target);
      setViews(filteredItems);
    } else {
      setViews(items);
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
      <SelectBox
        selected={selected}
        handleSelect={handleSelect}
        brands={brands}
      />
      <View />
    </>
  );
};

export default App;
