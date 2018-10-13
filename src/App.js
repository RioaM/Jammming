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
    this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
    this.removeTrackFromPlaylist = this.removeTrackFromPlaylist.bind(this);
  }

    addTrackToPlaylist(event){
      //do not add the same song more than once
      for(let y = 0; y < this.state.newPlayList.length; y++){
        if(this.state.newPlayList[y].songId == event.target.id){
          return;
        }
      }
      for(let x = 0; x < this.state.searchResults.length; x++){
        if(this.state.searchResults[x].songId == event.target.id){
          this.setState((state) => {
            state.newPlayList.push(state.searchResults[x]);
            return {newPlayList: state.newPlayList};
          });
          return;
        }
      }
    }

      removeTrackFromPlaylist(event){
        for(let x = 0; x < this.state.newPlayList.length; x++){
          if(this.state.newPlayList[x].songId == event.target.id){
            this.setState((state) => {
              let playlist = state.newPlayList.slice(0,x).concat(state.newPlayList.slice(x+1));
              return {newPlayList: playlist};
            });
            return;
          }
        }
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
            <SearchResults searchResults={this.state.searchResults} addToPlaylist={this.addTrackToPlaylist}/>
            <Playlist playlist={this.state.newPlayList} removeFromPlaylist={this.removeTrackFromPlaylist}/>
          </div>
        </div>
    );
  }
}

export default App;
