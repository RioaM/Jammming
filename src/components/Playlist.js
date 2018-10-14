import React, { Component } from 'react';
import './Playlist.css';
import { TrackList } from './TrackList';

export class Playlist extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="Playlist">
        <input type="text" defaultValue="New Playlist" onChange={this.props.updateName}/>
        <TrackList tracks={this.props.playlist} trackAction={"-"} handleClick={this.props.removeFromPlaylist} />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
