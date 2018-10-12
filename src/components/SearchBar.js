import React, { Component } from 'react';
import './SearchBar.css';

export class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {keywords: ''};
    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleKeywordsChange(event){
    this.setState({keywords: event.target.value});
  }

  handleSearch(event){
    //if(this.state.token === ''){
      this.props.authorization();
    //}
    //this.props.search(this.state.keywords);
    event.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleKeywordsChange} placeholder="Enter A Song Title" />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}
