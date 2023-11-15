import axios from 'axios';
import { Component } from 'react';
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

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    totalHits: null,
  };

  handleLoad = images => {
    this.setState(prevState => ({ images: [ ...prevState.images, ...images], page: prevState.page + 1}));
    scroll.animateScroll.scrollMore(650);
  }

  handleSubmit = async query => {
    if (query !== this.state.query && query.trim() !== '') {
      this.setState({ query, isLoading: true, error: null, images: [], totalHits: null });

      try {
        const [images, totalHits] = await api.getImagesData(query);
        this.setState({ images, totalHits, page: 2 });
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };
 
  render() {
    const { query, images, page, totalHits, isLoading } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} /> 

        {isLoading && <Loader />}
        {(page - 1) * 12 < totalHits && <Button onClick={this.handleLoad} page={page} query={query} />}
        <ToastContainer position='top-center' autoClose='1000' />
      </AppContainer>
    );
  }
}
