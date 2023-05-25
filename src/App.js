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

  //*useState

  useEffect(() => {
    const fetchCard = async () => {
      if (searchText) {
        try {
          const data = await fetch(
            `${BASE_URL}/?key=${API_KEY}&q=${searchText}&per_page=12&page=${page}`
          );
          if (data.status !== 200) {
            return Promise.reject(new Error('Search is empty'));
          }
          setLoading(true);
          const resp = await data.json();
          console.log(resp);
          if (resp.hits.length < 12) {
            setButtonVisible(false);
          }
          return await getFetch(resp);
        } catch (error) {
          setError({ error });
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCard();
  }, [searchText, page]);

  const heandleSearch = search => {
    if (search !== '' && search !== searchText) {
      setPage(1);
      setSearchText(search);
      setButtonVisible(true);
      setImages([]);
      setLoading(false);
    } else setButtonVisible(false);
  };

  const getFetch = resp => {
    const { hits, totalHits } = resp;

    if (totalHits > 0) {
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

  return (
    <AppDiv className="App">
      <SearchBar onSubmit={heandleSearch} />
      {loading && <div>загружаем</div>}
      {error && <h1>{error.message}</h1>}
      <ImageGallery options={images} />
      {buttonVisible && (
        <Button
          page={() => {
            setPage(prevState => prevState + 1);
          }}
        />
      )}
    </AppDiv>
  );
};

export default App;
