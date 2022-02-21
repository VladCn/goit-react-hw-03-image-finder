import React from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends React.Component {
  state = { name: null };

  handleNameChange = event => {
    event.preventDefault();

    this.setState({ name: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    this.props.onSubmit(event, this.state.name);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func,
};
