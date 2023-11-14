import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { AppContainer } from 'App.styled';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
  };

  handleSubmit = query => {
    if (query !== this.state.query && query.trim() !== '') {
      this.setState({ query });
    }
  };
 
  render() {
    const { query } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery query={query} />
      </AppContainer>
    );
  }
}
