import React, { Component } from 'react';
import { TrackList } from '../TrackList/TrackList';
import './Playlist.css';

export class Playlist extends Component {
  render() {
    return (
      <div className="Playlist">
        <input type="text" value={this.props.playlistName} onChange={this.props.updateName}/>
        <TrackList tracks={this.props.playlist} trackAction={"-"} handleClick={this.props.removeFromPlaylist} />
        <a className="Playlist-save" onClick={this.props.savePlaylist}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
