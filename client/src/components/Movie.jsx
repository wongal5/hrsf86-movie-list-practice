import React from 'react';
import ReactDOM from 'react-dom';
import { MovieDetails } from './MovieDetails.jsx';

export class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    this.toggleClick = this.toggleClick.bind(this);
    this.toggleWatched = this.toggleWatched.bind(this);
  }

  toggleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  toggleWatched(movieId) {
    this.props.callbackWatched(movieId);
  }

  render() {
    return (
      <div className="col-lg-12 row">
        {this.state.clicked ? 
          (<div className="title-box row selected" > <div onClick={this.toggleClick}><strong>{this.props.movie.title}</strong></div> <MovieDetails movie={this.props.movie} callback={this.toggleWatched} /> </div>) : 
          (<div className="title-box row" > <div onClick={this.toggleClick}>{this.props.movie.title}</div> </div>) }
      </div>
    );
  }
  
}