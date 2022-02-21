import React from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';

export class App extends React.Component {
  state = { data: [] };

  handleSubmit = async (event, data) => {
    event.preventDefault();

    await this.getPhoto(data);
  };

  async getPhoto(data) {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${data}&page=1&key=24765939-636e8942567168a69f12817e3&image_type=photo&orientation=horizontal&per_page=12`
      );
      console.log(response);
      const dataRes = response.data.hits.map(
        ({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })
      );
      this.setState({ data: dataRes });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery data={this.state.data} />
        <Button />
      </div>
    );
  }
}
