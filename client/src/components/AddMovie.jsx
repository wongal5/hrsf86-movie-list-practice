// form to add to database
import React from 'react';
import ReactDOM from 'react-dom';

export class AddMovie extends React.Component {
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
    // event.preventDefault();
    this.props.callbackSearch(this.state.searchValue);
    this.setState({
      searchValue: ''
    })
  }

  render() {
    return (
      <div>
        <form className="row" onSubmit={this.handleSearch}>
          <input className="add-form" type="text" placeholder="Add a movie to your collection..." required value={this.state.searchValue} onChange={this.handleChange}/>
          <input className="button" type="submit" value="Add Movie" />
        </form>
      </div>
    )};
}