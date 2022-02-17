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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setItems(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(MOCK_URL);
        setItems(response.data); // 데이터는 response.data 안에 들어있습니다.
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

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!items) return null;
  return (
    <>
      <Loading></Loading>
      <Search></Search>
      <SelectBox></SelectBox>
      <View></View>
    </>
  );
};

export default App;
