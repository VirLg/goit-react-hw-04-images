import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

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
  const [page, setPage] = useState(1);
  const [buttonVisible, setButtonVisible] = useState(false);
  //*useState

  useEffect(() => {
    const fetcCard = async () => {
      console.log(searchText);
      try {
        const data = await fetch(
          `${BASE_URL}/?key=${API_KEY}&q=${searchText}&per_page=12&page=${page}`
        );
        if (data.status !== 200) {
          return Promise.reject(new Error('Search is empty'));
        }

        const resp = await data.json();
        return await getFetch(resp);
      } catch (error) {
        setError({ error });
      } finally {
        setLoading({ loading: false });
      }
    };
    fetcCard();
  }, [searchText, page]);

  // setButtonVisible(false);
  // async componentDidUpdate(prevProps, prevState) {
  //   const { searchText, page } = this.state;

  //   if (prevState.searchText !== searchText || prevState.page !== page) {

  //   }
  // }

  const handlePage = () => {};

  const heandleSearch = searchText => {
    if (searchText) {
      setSearchText(searchText);
      setPage(5);
    } else setImages([]);
  };

  const getFetch = resp => {
    const { hits, totalHits } = resp;

    setImages(hits);

    const hitsArr = hits.map(({ tags, largeImageURL, previewURL }) => {
      return { tags, largeImageURL, previewURL };
    });

    //  else if (totalHits > 1) setButtonVisible(true);

    setImages(prevState => [...prevState, ...hitsArr]);
    console.log(images);
  };

  return (
    <AppDiv className="App">
      <SearchBar onSubmit={heandleSearch} />
      {loading && <div>загружаем</div>}
      {error && <h1>{error.message}</h1>}
      <ImageGallery options={images} />
      <Button page={handlePage} />
    </AppDiv>
  );
};

//Class
// class App extends React.Component {
//   state = {
//     searchText: '',
//     images: [],
//     loading: false,
//     error: null,
//     page: 1,
//     buttonVisible: false,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { searchText, page } = this.state;

//     if (prevState.searchText !== searchText || prevState.page !== page) {
//       this.setState({
//         buttonVisible: false,
//       });

//       try {
//         this.setState({ loading: true });
//         const data = await fetch(
//           `${BASE_URL}/?key=${API_KEY}&q=${searchText}&per_page=12&page=${page}`
//         );
//         if (data.status !== 200) {
//           return Promise.reject(new Error('Search is empty'));
//         }
//         const resp = await data.json();
//         return await this.getFetch(resp);
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({ loading: false });
//       }
//     }
//   }
//   handleOnClick = () => {
//     console.log(1);
//   };

//   heandleSearch = searchText => {
//     this.setState({
//       searchText: searchText,
//       images: [],
//     });
//   };
//   getFetch = ({ hits, totalHits }) => {
//     const hitsArr = hits.map(({ tags, largeImageURL, previewURL }) => {
//       return { tags, largeImageURL, previewURL };
//     });

//     this.setState(prevState => ({ images: [...prevState.images, ...hitsArr] }));
//     if (totalHits === 0)
//       this.setState({
//         images: [],
//       });
//     if (totalHits > 1)
//       this.setState({
//         buttonVisible: true,
//       });
//   };

//   handleLoadMore = onClick => {
//     console.log(onClick);
//     console.log(handleOnClick());
//     console.log(this.handleLoadMore);
//   };

//   render() {
//     const { error, loading, images, buttonVisible } = this.state;

//     return (
//       <AppDiv className="App">
//         <SearchBar onSubmit={this.heandleSearch} />
//         {loading && <div>загружаем</div>}
//         {error && <h1>{error.message}</h1>}
//         <ImageGallery options={images} />
//         {buttonVisible && <Button page={this.handleLoadMore} />}
//       </AppDiv>
//     );
//   }
// }

export default App;
