import React from 'react';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }
  componentDidMount() {
    document.addEventListener('keypress', event => {
      console.log(event.key);
    });
  }


  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-image">
          <img src={movie.ImagePath} alt="Movie image" />
        </div>
        <div className="movie-title">
          <span className="label" >Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <button onClick={() => { onBackClick(null) }}>Back</button>
      </div>
    );
  }
}