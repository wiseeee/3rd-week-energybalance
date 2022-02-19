/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Search from './components/Search/index';
import SelectBox from './components/SelectBox/index';
import axios from 'axios';
import Loading from './components/Loading';
import useDebounce from './hooks/useDebounce';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as S from './styled';

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
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [token, setToken] = useState(null);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [recommend, setRecommend] = useState([]);

  const GetData = async (API_ADDRESS: string) => {
    setLoading(true);
    const response = await axios.get(API_ADDRESS);
    setLoading(false);
    return response.data;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target.value;
    setInput(target);
  };

  const deleteSearchHistory = (
    e: React.MouseEvent<HTMLButtonElement>,
    targetIndex: number,
  ): void => {
    const temp = searchHistory.filter((_, index) => index !== targetIndex);
    setSearchHistory(temp);
  };

  const changeSearchHistory = (value: string) => {
    if (searchHistory.includes(value)) {
      const filteredHistory = searchHistory.filter((ele) => ele !== value);
      setSearchHistory([value, ...filteredHistory]);
    } else if (searchHistory.length < 10) {
      setSearchHistory([value || input, ...searchHistory]);
    } else {
      const tmp = [...searchHistory];
      tmp.pop();
      setSearchHistory([value || input, ...tmp]);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleTagClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit(e, e.currentTarget.value);
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    value = '',
  ) => {
    e.preventDefault();

    const result = value || input;
    if (result.length === 0) return;
    setCurrentKeyword(result);
    changeSearchHistory(result);

    const response = await GetData(`${MOCK_URL}/nutrients?keyword=${result}`);
    setView(response.nutrients);
    setToken(response.pagination.next);
    setInput('');
  };

  const getNextPage = async () => {
    const response = await axios.get(`${MOCK_URL}${token}`);
    const result = response.data;
    const data: Items[] = result.nutrients;
    setView([...view, ...data]);
    setToken(result.pagination.next);
  };

  useEffect(() => {
    const fetchBrandAndTags = async () => {
      try {
        setError(null);

        const tagsResponse = await GetData(`${MOCK_URL}/tags`);
        setRecommend(tagsResponse.tags.slice(0, 10));

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
    fetchBrandAndTags();
  }, []);

  useEffect(() => {
    token === null ? setHasMore(false) : setHasMore(true);
  }, [token]);

  useEffect(() => {
    const getData = async () => {
      const response = await GetData(
        `${MOCK_URL}/nutrients?keyword=${currentKeyword}&brand=${selected}`,
      );
      setView(response.nutrients);
      setToken(response.pagination.next);
    };
    getData();
  }, [selected]);

  const debouncedValue = useDebounce<string>(input);

  useEffect(() => {
    const getData = async () => {
      try {
        setError(null);
        setItems([]);
        const response = await GetData(
          `${MOCK_URL}/nutrients?keyword=${input}`,
        );
        setItems(response.nutrients.slice(0, 5));
      } catch (err: unknown) {
        if (err instanceof Error) {
          return {
            message: `Things exploded (${err.message})`,
          };
        }
        setLoading(false);
      }
    };
    getData();
  }, [debouncedValue]);

  if (error) return <div>에러가 발생했습니다</div>;
  if (!items) return null;

  return (
    <S.Wrapper>
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
        handleTagClick={handleTagClick}
      />
      <br />
      {currentKeyword && (
        <p>
          {currentKeyword}({view.length}) 에 대한 검색결과입니다.
        </p>
      )}
      <InfiniteScroll
        dataLength={view.length}
        next={getNextPage}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>모든 상품을 불러왔습니다.</b>
          </p>
        }
      >
        {view.length ? (
          <S.ItemList>
            {view.map((item, index) => (
              <S.ItemWrap key={index}>
                <S.ItemsBrand>{item.브랜드}</S.ItemsBrand>
                <S.ItemsName>{item.제품명}</S.ItemsName>
              </S.ItemWrap>
            ))}
          </S.ItemList>
        ) : (
          <Loading />
        )}
      </InfiniteScroll>
    </S.Wrapper>
  );
};
export default App;
