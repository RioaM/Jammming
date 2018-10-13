import React, { Component } from 'react';

export class Track extends Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.songName}</h3>
          <p>{this.props.track.artists} | {this.props.track.album}</p>
        </div>
        <a id={this.props.track.songId.toString()} className="Track-action">{this.props.trackAction}</a>
      </div>
    );
  }
}
