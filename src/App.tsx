/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Search from './components/Search/index';
import SelectBox from './components/SelectBox/index';
import axios from 'axios';
import Loading from './components/Loading';
import useDebounce from './hooks/useDebounce';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as S from './styled';

const Wrapper = styled.div`
  max-width: 768px;
  margin: 0 auto;
`;

const MOCK_URL = 'https://sixted-energybalance.herokuapp.com';
export type Items = {
  제품명: string;
  브랜드: string | null;
};
const App: React.FC = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [view, setView] = useState<Items[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');
  const debouncedValue = useDebounce<string>(input, 500);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [token, setToken] = useState(null);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [currentBrand, setCurrentBrand] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [recommend, setRecommend] = useState([]);

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

  const changeSearchHistory = (value: string) => {
    if (searchHistory.includes(value)) {
      const filteredHistory = searchHistory.filter((ele) => ele !== value);
      filteredHistory.unshift(value);
      setSearchHistory(filteredHistory);
    } else if (searchHistory.length < 10) {
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
    const result = value || input;
    setCurrentKeyword(result);
    changeSearchHistory(result);
    const response = await GetData(`${MOCK_URL}/nutrients?keyword=${result}`);
    setView(response.nutrients);
    setToken(response.pagination.next);
    setInput('');
  };

  const getNextPage = async () => {
    const newUrl = `${MOCK_URL}${token}`;
    const response = await axios.get(`${MOCK_URL}${token}`);
    const result = response.data;
    const data: Items[] = result.nutrients;
    setView([...view, ...data]);
    setToken(result.pagination.next);
  };

  useEffect(() => {
    if (token === null) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [token]);

  useEffect(() => {
    const getData = async () => {
      const res = await GetData(
        `${MOCK_URL}/nutrients?keyword=${currentKeyword}&brand=${selected}`,
      );
      setView(res.nutrients);
      setToken(res.pagination.next);
    };
    getData();
  }, [selected]);

  useEffect(() => {
    const fetchBrand = async () => {
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
    const fetchTag = async () => {
      try {
        setError(null);
        const res = await GetData(`${MOCK_URL}/tags`);
        setRecommend(res.tags.slice(0, 10));
      } catch (err: unknown) {
        if (err instanceof Error) {
          return {
            message: `Things exploded (${err.message})`,
          };
        }
        setLoading(false);
      }
    };
    fetchBrand();
    fetchTag();
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
  }, [debouncedValue]);

  if (error) return <div>에러가 발생했습니다</div>;
  if (!items) return null;

  return (
    <>
      <Wrapper>
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
          recommend={recommend}
          handleOnClick={() => {}}
          onSubmit={onSubmit}
        />
        {currentKeyword && <p>{currentKeyword} 에 대한 검색결과입니다.</p>}
        <InfiniteScroll
          dataLength={view.length} //This is important field to render the next data
          next={getNextPage}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>모든 상품을 불러왔습니다.</b>
            </p>
          }
        >
          <S.ItemList>
            {view.map((item) => (
              <a href="#">
                <S.ItemWrap>
                  <S.ItemsBrand>{item.브랜드}</S.ItemsBrand>
                  <S.ItemsName>{item.제품명}</S.ItemsName>
                </S.ItemWrap>
              </a>
            ))}
          </S.ItemList>
        </InfiniteScroll>
      </Wrapper>
    </>
  );
};
export default App;
