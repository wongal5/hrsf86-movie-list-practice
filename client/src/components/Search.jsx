// form to search existing database
import React from 'react';
import ReactDOM from 'react-dom';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }
  
  handleSearch(event) {
    event.preventDefault();
    this.props.callbackSearch(this.state.searchValue);
  }

  render() {
    return (
    <div>
      <form className="row" onSubmit={this.handleSearch}>
        <input className="search-form" type="text" placeholder="Search a movie name..." required onChange={this.handleChange} onKeyUp={this.handleSearch}/>
        <input className="button" type="submit" value="Search"/>
      </form>
    </div>
  )};
}