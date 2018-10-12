import React, { Component } from 'react';
import './Playlist.css';

export class Playlist extends Component {
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" />
        <a>SEARCH</a>
      </div>
    );
  }
}
