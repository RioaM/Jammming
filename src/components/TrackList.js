import React, { Component } from 'react';
import './TrackList.css';
import { Track } from './Track'

export class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {
            this.props.tracks ? this.props.tracks.map(track => {
              return <Track key={track.songId.toString()} handleClick={this.props.handleClick} trackAction={this.props.trackAction} track={track} />
            }) : <div></div>
        }
      </div>
    );
  }
}
