import React, { Component } from 'react'
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    show: false,
  }

  showModal = e => {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  render() {
    const { smallImage, largeImage } = this.props;
    const { show } = this.state;
    return (
      <GalleryItem onClick={this.showModal}>
        <GalleryImage src={smallImage} alt='Query image'/>
        {show && <Modal largeImage={largeImage} onEsc={this.showModal}/>}
      </GalleryItem>
    )
  }
}
