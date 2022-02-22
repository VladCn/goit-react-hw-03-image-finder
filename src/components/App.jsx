import React from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';

export class App extends React.Component {
  state = { data: [], total: 0, currentPage: 0, search: null };

  itemsPerPage = 12;

  handleSubmit = async (event, data) => {
    event.preventDefault();
    this.setState({
      currentPage: 1,
      search: data,
    });
  };

  handleLoadMore = () => {
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }));
  };

  async getPhoto(search, newPage = 1) {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${search}&page=${newPage}&key=24765939-636e8942567168a69f12817e3&image_type=photo&orientation=horizontal&per_page=${this.itemsPerPage}`
      );
      console.log(response);

      const dataRes = response.data.hits.map(
        ({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })
      );
      this.setState({
        data: dataRes,
        total: response.data.total,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.currentPage !== this.state.currentPage
    ) {
      await this.getPhoto(this.state.search, this.state.currentPage);
    }
  }

  render() {
    const isButtonVisible =
      this.state.currentPage && this.state.total / this.itemsPerPage > 1;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery data={this.state.data} />
        {isButtonVisible ? <Button onClick={this.handleLoadMore} /> : null}
      </div>
    );
  }
}
