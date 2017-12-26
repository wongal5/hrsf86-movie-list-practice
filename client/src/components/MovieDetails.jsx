import React from 'react';
import ReactDOM from 'react-dom';

export class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleWatched = this.handleWatched.bind(this);
  }

  handleWatched() {
    this.props.callback(this.props.movie.id);
  }


  render() {
    return (
    <div className="row">
      <div className="movie-details col-md-8">
        <div>Release Date: {this.props.movie.release_date}</div>
        <div>Average Rating: {this.props.movie.vote_average}</div>
        <label htmlFor={this.props.movie.id} >Watched: </label>
        <input className={this.props.movie.id} type="checkbox" onChange={this.handleWatched} defaultChecked={this.props.movie.watchedFlag ? 'checked' : ''} />
      </div>
      <img className="poster col-md-3" src={'https://image.tmdb.org/t/p/w1280/' + this.props.movie.poster_path} />
    </div>
  )};
}