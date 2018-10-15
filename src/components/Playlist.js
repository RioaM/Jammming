import React, { Component } from 'react';
import './Playlist.css';
import { TrackList } from './TrackList';

export class Playlist extends Component {

  render() {
    return (
      <div className="Playlist">
        <input type="text" defaultValue="New Playlist" onChange={this.props.updateName}/>
        <TrackList tracks={this.props.playlist} trackAction={"-"} handleClick={this.props.removeFromPlaylist} />
        <a className="Playlist-save" onClick={this.props.savePlaylist}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
