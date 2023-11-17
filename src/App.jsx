import axios from 'axios';
import { useState } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { AppContainer } from 'App.styled';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import * as scroll from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'api/imageService';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);

  const handleLoad = images => {
    setImages(img => [...img, ...images]);
    setPage(page => page + 1);
    scroll.animateScroll.scrollMore(650);
  };

  const handleSubmit = async inputQuery => {
    if (inputQuery !== query && inputQuery.trim() !== '') {
      setQuery(inputQuery);
      setIsLoading(true);
      setError(null);
      setImages([]);
      setTotalHits(null);

      try {
        const [apiImages, totalHits] = await api.getImagesData(query);
        setImages(apiImages);
        setTotalHits(totalHits);
        setPage(2);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />

      {isLoading && <Loader />}
      {(page - 1) * 12 < totalHits && (
        <Button onClick={handleLoad} page={page} query={query} />
      )}
      <ToastContainer position="top-center" autoClose="1000" />
    </AppContainer>
  );
};
