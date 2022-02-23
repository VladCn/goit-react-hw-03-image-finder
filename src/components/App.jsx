import React from 'react';
import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import { Audio } from 'react-loader-spinner';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Modal } from './Modal';

export class App extends React.Component {
  state = {
    data: [],
    total: 0,
    currentPage: 0,
    search: null,
    loading: false,
    largeImageURL: null,
  };

  itemsPerPage = 12;

  handleCloseModal = () => {
    this.setState({ largeImageURL: null });
  };

  handleGalleryItemClick = event => {
    const largeImageURL = event.target.getAttribute('data-largeimage');
    if (largeImageURL) {
      this.setState({ largeImageURL });
    }
  };

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
      this.setState({ loading: true });
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
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.currentPage !== this.state.currentPage
    ) {
      await this.getPhoto(this.state.search, this.state.currentPage);
    }
  }

  componentWillUnmount() {}

  render() {
    const isButtonVisible =
      this.state.currentPage && this.state.total / this.itemsPerPage > 1;
    // const isStateData = this.state.currentPage > 0 && this.state.search;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          data={this.state.data}
          onClick={this.handleGalleryItemClick}
        />

        {this.state.loading ? (
          <Audio
            wrapperStyle={{ justifyContent: 'center' }}
            height="100"
            width="100"
            color="grey"
            ariaLabel="loading"
          />
        ) : null}
        {isButtonVisible ? <Button onClick={this.handleLoadMore} /> : null}

        {this.state.largeImageURL && (
          <Modal onClose={this.handleCloseModal}>
            <img src={this.state.largeImageURL} alt="image" />
          </Modal>
        )}
      </div>
    );
  }
}
