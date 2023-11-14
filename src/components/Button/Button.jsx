import React, { Component } from 'react'
import { LoadButton } from './Button.styled'
import api from 'api/imageService';

export default class Button extends Component {
  handleClick = async e => {
    const { onClick, page, query } = this.props;
    
    try {
      const images = await api.loadMoreImages(query, page);
      onClick(images);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <LoadButton type='button' onClick={this.handleClick}>Load more</LoadButton>
    )
  }
}
