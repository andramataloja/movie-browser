import React from "react";
import NavBar from "../NavBar/NavBar";
import Actor from "./Actor";
import Navigation from "../Navigation/Navigation";
import "./Actor.css";

const apiKey = "d9aede722599117d216a2e4fdbeb23b9";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: "",
      actors: []
    };
  }

  componentDidMount() {
    const movieEndpoint = `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?language=en-US&api_key=${apiKey}`;
    this.fetchMovieData(movieEndpoint);
    const actorsEndpoint = `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=${apiKey}`;
    this.fetchActors(actorsEndpoint);
  }

  fetchMovieData = movieEndpoint => {
    fetch(movieEndpoint)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movie: data
        });
      })
      .catch(error => {});
  };

  fetchActors = actorsEndpoint => {
    fetch(actorsEndpoint)
      .then(response => response.json())
      .then(data => {
        this.setState({
          actors: data.cast
        });
      })
      .catch(error => {});
  };

  render() {
    const { movie } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <NavBar></NavBar>
          <Navigation />
          {this.state.movie ? (
            <div className="container">
              <div className="col-sm-12 d-block d-md-none text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt={movie.title}
                  className="poster-pic"
                />
              </div>
              <div className="card text-style mt-3" id="movie-detail">
                <div className="row">
                  <div className="col-md-6 col-lg-4 d-none d-md-block">
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                      alt={movie.title}
                      className="poster-pic"
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        {movie.title}
                        {this.state.movie.vote_average ? (
                          <div className="rating2 float-right">
                            <i
                              className="fa fa-star mr-1"
                              aria-hidden="true"
                            ></i>
                            {movie.vote_average}
                          </div>
                        ) : (
                          ""
                        )}
                      </h5>
                      {this.state.movie.tagline ? (
                        <p className="card-title mb-4 font-italic tagline">
                          {movie.tagline}
                        </p>
                      ) : (
                        ""
                      )}
                      <span className="topic">Overview</span>
                      <p className="card-text">{movie.overview}</p>
                      {this.state.movie.genres ? (
                        <div>
                          <span className="mr-2 topic">Genres:</span>
                          {movie.genres.map(genre => (
                            <span
                              className="badge badge-secondary mr-2"
                              key={genre.id}
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row movie-facts">
                {this.state.movie.release_date ? (
                  <div className="col-sm-12 col-md-4 mb-2 text-center">
                    <i
                      className="fa fa-calendar-times-o"
                      aria-hidden="true"
                    ></i>
                    Release date: {movie.release_date}
                  </div>
                ) : (
                  " "
                )}
                {this.state.movie.budget ? (
                  <div className="col-sm-12 col-md-4 mb-2 text-center">
                    <i className="fa fa-money" aria-hidden="true"></i> Movie
                    budget: {formatBudget(movie.budget)}
                  </div>
                ) : (
                  " "
                )}
                {this.state.movie.runtime ? (
                  <div className="col-sm-12 col-md-4 text-center">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                    Duration:
                    {formatTime(movie.runtime)}
                  </div>
                ) : (
                  " "
                )}
              </div>
            </div>
          ) : (
            ""
          )}
          {this.state.actors ? (
            <div>
              <h4>Actors</h4>
              <div className="d-flex flex-wrap justify-content-between">
                {this.state.actors.map(actor => (
                  <Actor actor={actor} key={actor.id}></Actor>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </React.Fragment>
    );
  }
}

const formatTime = time => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
};

const formatBudget = budget => {
  var money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });
  return money.format(budget);
};

export default Movie;
