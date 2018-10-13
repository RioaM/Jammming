import React, { Component } from 'react';
import './SearchResults.css';
import { TrackList } from './TrackList';

export class SearchResults extends Component {
  constructor(props){
    super(props);
    this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
  }

  addTrackToPlaylist(event){
    return;
  }

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} trackAction={"+"} handleClick={this.addTrackToPlaylist}/>
      </div>
    );
  }
}
