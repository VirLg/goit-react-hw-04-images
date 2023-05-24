import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SearchBar from './components/SearchBar/SearchBar';
import Button from 'components/Button/Button';
import { AppDiv } from './App.styled';
import ImageGallery from 'components/ImageGallery/ImageGallery';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34368263-756a5eb3a3e360b335b61bac8';
// Hook
const App = () => {
  //*useState
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [visibleCard, setVisibleCard] = useState(false);

  //*useState

  useEffect(() => {
    const fetchCard = async () => {
      console.log(searchText);
      try {
        const data = await fetch(
          `${BASE_URL}/?key=${API_KEY}&q=${searchText}&per_page=12&page=${page}`
        );
        if (data.status !== 200) {
          return Promise.reject(new Error('Search is empty'));
        }
        setLoading(true);
        const resp = await data.json();
        return await getFetch(resp);
      } catch (error) {
        setError({ error });
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, [searchText, page]);

  const heandleSearch = search => {
    if (search !== '') {
      setPage(1);
      setSearchText(search);
      setButtonVisible(true);
      setVisibleCard(true);
      setLoading(false);
    } else setButtonVisible(false);
  };

  const handleSearch = value => {
    if (value) {
      setButtonVisible(false);
      setVisibleCard(false);
      setLoading(true);
      setImages([]);
    }
  };

  useEffect(() => {
    handleSearch();
  });

  const getFetch = resp => {
    const { hits, totalHits } = resp;

    if (totalHits > 1) {
      const hitsArr = hits.map(({ tags, largeImageURL, previewURL }) => {
        return {
          tags,
          largeImageURL,
          previewURL,
        };
      });
      return setImages(prevState => [...prevState, ...hitsArr]);
    } else if (totalHits < 1) {
      setImages([]);
      Notify.failure('Sorry, this search not valide.');
      setButtonVisible(false);
    }
  };

  const loadMore = page => {
    setPage(prevState => prevState + 1);
  };

  return (
    <AppDiv className="App">
      <SearchBar onSubmit={heandleSearch} onSearch={handleSearch} />
      {loading && <div>загружаем</div>}
      {error && <h1>{error.message}</h1>}
      {visibleCard && <ImageGallery options={images} />}
      {buttonVisible && <Button page={loadMore} />}
    </AppDiv>
  );
};

export default App;
