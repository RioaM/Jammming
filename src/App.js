import React, { Component } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Playlist } from './components/Playlist';
import { SpotifyAPI } from './util/SpotifyAPI';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          songName: 'Tiny Dancer',
          artists: 'Elton John',
          album: 'Madman Across The Water',
          songId: 1
        },
        {
          songName: 'Tiny Dancer',
          artists: 'Tim McGraw',
          album: 'Love Story',
          songId: 2
        },
        {
          songName: 'Tiny Dancer',
          artists: 'Rockabye Baby!',
          album: 'Lullaby Renditions of Elton John',
          songId: 3
        }
      ],
      newPlayList: [],
      token: ''
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.getAuthorization = this.getAuthorization.bind(this);
  //  this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
  //  this.removeTrackFromPlaylist = this.removeTrackFromPlaylist.bind(this);
  }

  searchSpotify(keywords){
    SpotifyAPI.search(keywords).then(trackList => {
      this.setState({searchResults: trackList});
      console.log('searchResults:' + this.state.searchResults);
    });
  }

  getAuthorization(){
    SpotifyAPI.authorization();
  }

  render() {
    return (
        <div className="App">
          <SearchBar authorization={this.getAuthorization} token={this.state.token} search={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} newPlayList={this.state.newPlayList}/>
            <Playlist />
          </div>
        </div>
    );
  }
}

export default App;
