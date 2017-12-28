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
        <div>Release Date: {this.props.movie.releaseDate}</div>
        <div>Average Rating: {this.props.movie.voteAverage}</div>
          <div> <em>{this.props.movie.overview} </em> </div>
        
      </div>
      <div className="col-md-3">
        <img className="poster" src={'https://image.tmdb.org/t/p/w1280/' + this.props.movie.posterPath} />
        <label htmlFor={this.props.movie.id} >Watched: </label>
        <input className={this.props.movie.id} type="checkbox" onChange={this.handleWatched} defaultChecked={this.props.movie.watchedFlag ? 'checked' : ''} />
        </div>
    </div>
  )};
}