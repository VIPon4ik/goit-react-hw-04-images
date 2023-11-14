import React, { Component } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled'

export default class Loader extends Component {
  render() {
    return (
      <LoaderContainer >
        <InfinitySpin />
      </LoaderContainer>
    );
  }
}
