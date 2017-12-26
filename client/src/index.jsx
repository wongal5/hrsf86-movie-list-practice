import React from 'react';
import ReactDOM  from 'react-dom';
import { Movie } from './components/Movie.jsx';
import { Search } from './components/Search.jsx';
import { AddMovie } from './components/AddMovie.jsx';
var movies = require(__dirname + '/testData.js');

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentResults: this.props.movies
    };
    this.newSearch = this.newSearch.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.addCheckedOff = this.addCheckedOff.bind(this);
    this.filterByWatched = this.filterByWatched.bind(this);
    this.unfilter = this.unfilter.bind(this);
    this.watched = {};
  }

  addMovie(query) {
    //currently does nothing
    console.log(query);
  }

  newSearch(query) {
    query = query.toLowerCase();
    let searchResults = [];
    this.props.movies.forEach((movie) => {
      if (movie.title.toLowerCase().includes(query)) {
        searchResults.push(movie);
      }
    });
    this.setState({
      currentResults: searchResults
    })
  }

  addCheckedOff(movieId) {
    let movies = this.state.currentResults;
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id === movieId) {
        movies[i].watchedFlag ? movies[i].watchedFlag = false : movies[i].watchedFlag = true;
      }
    }
    this.setState({
      currentResults: movies
    })
  }

  filterByWatched(event) {
    let movies = this.props.movies;
    let filterResults = [];
    let flag = event.target.value === 'watched' ? true : false;
    console.log(flag);
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].watchedFlag === flag) {
        filterResults.push(movies[i]);
      }
    }
    this.setState({
      currentResults: filterResults
    })
  }

  unfilter() {
    this.setState({
      currentResults: this.props.movies
    })
  }

  render() {
    return (
      <div className="main row">
        <div className="add-movie-bar">
          <AddMovie callbackSearch={this.addMovie}/>
        </div>
        <div className="search-bar">
          <Search callbackSearch={this.newSearch}/>
        </div>
        <div className="results-table row">
          <div className="col-lg-12 row">
            <button className="watch-filter col-md-4 watched" value="watched" onClick={this.filterByWatched}> Watched </button>
            <button className="watch-filter col-md-4 to-watch" value = "toWatch" onClick={this.filterByWatched}> To Watch </button>
            <button className="watch-filter col-md-4 to-watch" value="unfilter" onClick={this.unfilter}> Undo Filters </button>
          </div>
          { this.state.currentResults.length ? 
            (this.state.currentResults.map(movie => {
                return <Movie movie={movie} key={movie.id} callbackWatched={this.addCheckedOff} />
              })) : 
              (<p> No results found! </p>)
            }
        </div>
      </div>
    );
  }
}

ReactDOM.render( <MovieList movies={movies} />, document.getElementById('app'));
