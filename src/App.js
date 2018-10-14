import React, { Component } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Playlist } from './components/Playlist';
import { SpotifyAPI } from './util/SpotifyAPI';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    /*this.state = {
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
      ],*/
    this.state = {
      searchResults: [],
      newPlaylist: [],
      playlistName: '',
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
    this.removeTrackFromPlaylist = this.removeTrackFromPlaylist.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

    addTrackToPlaylist(event){
      //do not add the same song more than once
      for(let y = 0; y < this.state.newPlaylist.length; y++){
        if(this.state.newPlaylist[y].trackID == event.target.id){
          return;
        }
      }
      for(let x = 0; x < this.state.searchResults.length; x++){
        if(this.state.searchResults[x].trackID == event.target.id){
          this.setState((state) => {
            state.newPlaylist.push(state.searchResults[x]);
            return {newPlaylist: state.newPlaylist};
          });
          return;
        }
      }
    }

      removeTrackFromPlaylist(event){
        for(let x = 0; x < this.state.newPlaylist.length; x++){
          if(this.state.newPlaylist[x].trackID == event.target.id){
            this.setState((state) => {
              let playlist = state.newPlaylist.slice(0,x).concat(state.newPlaylist.slice(x+1));
              return {newPlaylist: playlist};
            });
            return;
          }
        }
      }

    updatePlaylistName(event){
      this.setState({playlistName: event.target.value});
      console.log('New playlist name:' + this.state.playlistName);
    }

    searchSpotify(keywords){
      if(SpotifyAPI.getToken()){
        SpotifyAPI.search(keywords).then(trackList => {
          this.setState({searchResults: trackList});
          console.log('searchResults:' + this.state.searchResults);
        });
      }
    }

  render() {
    return (
        <div className="App">
          <SearchBar search={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} addToPlaylist={this.addTrackToPlaylist}/>
            <Playlist playlist={this.state.newPlaylist} removeFromPlaylist={this.removeTrackFromPlaylist} updateName={this.updatePlaylistName}/>
          </div>
        </div>
    );
  }
}

export default App;
