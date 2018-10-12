import React, { Component } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { SpotifyAPI } from './util/SpotifyAPI';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      newPlayList: [],
      token: ''
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.getAuthorization = this.getAuthorization.bind(this);
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
            <div className="Playlist">
              <input value='New Playlist' />
              <div className="TrackList">
                <div className="Track">
                  <div className="Track-information">
                    <h3>Stronger</h3>
                    <p>Britney Spears | Oops!... I Did It Again</p>
                  </div>
                  <a className="Track-action">-</a>
                </div>
                <div className="Track">
                  <div className="Track-information">
                    <h3>So Emotional</h3>
                    <p>Whitney Houston | Whitney</p>
                  </div>
                  <a className="Track-action">-</a>
                </div>
                <div className="Track">
                  <div className="Track-information">
                    <h3>It's Not Right But It's Okay</h3>
                    <p>Whitney Houston | My Love Is Your Love</p>
                  </div>
                  <a className="Track-action">-</a>
                </div>
              </div>
              <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
