import axios from 'axios';
import api from 'api/imageService';
import React, { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import * as scroll from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    totalHits: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (nextQuery !== prevQuery) {
      this.setState({ isLoading: true, error: null, images: [], totalHits: null });

      try {
        const [images, totalHits] = await api.getImagesData(this.props.query);
        this.setState({ images, totalHits, page: 2 });
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleLoad = images => {
    this.setState(prevState => ({ images: [ ...prevState.images, ...images], page: prevState.page + 1}));
    scroll.animateScroll.scrollMore(650);
  }

  render() {
    const { images, isLoading, totalHits, page } = this.state;
    const { query } = this.props;

    return (
      <div>
        <Gallery>
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              smallImage={webformatURL}
              largeImage={largeImageURL}
            />
          ))}
        </Gallery>

        {isLoading && <Loader />}
        {(page - 1) * 12 < totalHits && <Button onClick={this.handleLoad} page={page} query={query} />}
        <ToastContainer position='top-center' autoClose='1000' />
      </div>
    );
  }
}
