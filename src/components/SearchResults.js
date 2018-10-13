import React, { Component } from 'react';
import { TrackList } from './components/TrackList';
import './SearchResults.css';

export class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList />
      </div>
    );
  }
}
