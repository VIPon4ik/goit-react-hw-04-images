import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

export const ImageGalleryItem = ({ smallImage, largeImage }) => {
  const [show, setShow] = useState(false);

  const showModal = e => {
    setShow(prevState => !prevState.show);
  };

  return (
    <GalleryItem onClick={showModal}>
      <GalleryImage src={smallImage} alt="Query image" />
      {show && <Modal largeImage={largeImage} onEsc={showModal} />}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
