import React, { Component } from 'react';

export class Track extends Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.trackName}</h3>
          <p>{this.props.track.artists} | {this.props.track.album}</p>
        </div>
        <a id={this.props.track.trackID.toString()} className="Track-action" onClick={this.props.handleClick}>{this.props.trackAction}</a>
      </div>
    );
  }
}
