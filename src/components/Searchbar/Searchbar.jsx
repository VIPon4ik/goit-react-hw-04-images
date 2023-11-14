import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs'
import {
  SearchbarHeader,
  SearchbarForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const { value } = e.currentTarget.query;
    this.props.onSubmit(value.trim())

    e.currentTarget.reset();
  }

  render() {
    return (
      <SearchbarHeader>
        <SearchbarForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <BsSearch />
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name='query'
          />
        </SearchbarForm>
      </SearchbarHeader>
    );
  }
}
