import React from "react";
import NavBar from "../NavBar/NavBar";
import MovieFilter from "../MovieFilter/MovieFilter";
import PageNavigation from "../PageNavigation/PageNavigation";
import logo from "../tmdblogo.png";
import { Link } from "react-router-dom";
import "./Home.css";
import Moment from "react-moment";

const apiKey = "d9aede722599117d216a2e4fdbeb23b9";

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log("props page:", props.match.params.page);
    this.state = {
      moviesList: [],
      movieFilterSelection: props.match.params.filter
        ? props.match.params.filter
        : "popular",
      activePage: props.match.params.page ? props.match.params.page : 1,
      totalPages: "",
      query: props.match.params.query ? props.match.params.query : ""
    };
    this.getFilterSelection = this.getFilterSelection.bind(this);
    this.changePage = this.changePage.bind(this);
    this.sendTotalPages = this.sendTotalPages.bind(this);
    this.performSearch = this.performSearch.bind(this);
  }

  changePage = page => {
    this.setState({ activePage: page }, () => {
      this.componentDidMount();
    });
  };

  sendTotalPages = pages => {
    this.setState({ totalPages: pages }, () => {
      this.componentDidMount();
    });
  };

  getFilterSelection(selection) {
    this.setState(
      {
        movieFilterSelection: selection,
        activePage: 1,
        query: ""
      },
      () => {
        this.componentDidMount();
      }
    );
  }

  performSearch(query) {
    this.setState(
      {
        query: query,
        activePage: 1,
        movieFilterSelection: "search"
      },
      () => {
        this.componentDidMount();
      }
    );
  }

  componentDidMount() {
    const activePage = this.state.activePage;
    if (this.state.query !== "") {
      const moviesEndpointSearch=`https://api.themoviedb.org/3/search/movie?include_adult=false&page=${activePage}&language=en-US&query=${this.props.match.params.query}&api_key=${apiKey}`;
      const moviesEndpointForCoverImgSearch=`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&query=${this.props.match.params.query}&api_key=${apiKey}`;
      this.fetchSearch(moviesEndpointSearch);  
      this.fetchCoverImg(moviesEndpointForCoverImgSearch);
    } else{
      const moviesEndpoint = `https://api.themoviedb.org/3/movie/${this.state.movieFilterSelection}?page=${activePage}&language=en-US&api_key=${apiKey}`;
      const moviesEndpointForCoverImg = `https://api.themoviedb.org/3/movie/${this.state.movieFilterSelection}?page=1&language=en-US&api_key=${apiKey}`;
      this.fetchMovies(moviesEndpoint);
      this.fetchCoverImg(moviesEndpointForCoverImg);
    }
  }

  fetchMovies = moviesEndpoint => {
    fetch(moviesEndpoint)
      .then(response => response.json())
      .then(data => {
        this.setState({
          moviesList: data.results,
          totalPages: data.total_pages
        });
      })
      .catch(error => {});
  };

  fetchCoverImg = coverImgEndpoint => {
    fetch(coverImgEndpoint)
      .then(response => response.json())
      .then(data => {
        this.setState({
          background: data.results[0].backdrop_path,
          movieImgTitle: data.results[0].title,
          movieImgId: data.results[0].id,
          movieImgRelease: data.results[0].release_date
        });
        this.fetchCoverImgGenres();
      })
      .catch(error => {});
  };

  fetchCoverImgGenres=()=>{
    fetch(
      `https://api.themoviedb.org/3/movie/${this.state.movieImgId}?language=en-US&api_key=${apiKey}`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          genres: data.genres
        });
      })
      .catch(error => {});
  }

  fetchSearch=(searchEndpoint)=> {
    fetch(searchEndpoint)
      .then(response => response.json())
      .then(data => {
        this.setState({
          moviesList: data.results,
          totalPages: data.total_pages
        });
      })
      .catch(error => {});
  }
  render() {
    const { moviesList } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <NavBar
            searchMovie={this.performSearch}
            activePage={this.state.activePage}
          ></NavBar>
          <MovieFilter
            filterSelection={this.getFilterSelection}
            activePage={this.state.activePage}
          ></MovieFilter>
          {this.state.background ? (
            <div className="card hvr-fade" id="movie-pic">
              <Link to={`/movie/${this.state.movieImgId}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original${this.state.background}`}
                  className="card-img"
                  alt="movie"
                />
                <div className="card-img-overlay">
                  <div className="img-text">
                    <p className="card-title">{this.state.movieImgTitle}</p>
                    {this.state.genres ? (
                      <div className="genres mb-1">
                        {this.state.genres.map(genre => (
                          <span className="badge badge-secondary mr-2 cover-badge" key={genre.id}>
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.movieImgRelease ? (
                      <div className="release">
                        <span>Release: </span>
                        <Moment format="D MMMM YYYY">
                          {this.state.movieImgRelease}
                        </Moment>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            ""
          )}
          {this.state.query ? (
          <div className="mt-4 search-info" >Search for: {this.state.query} </div>
          ) : (
          ""
          )}
          <div className="d-flex flex-wrap justify-content-between mt-4">
            {moviesList.map(movie => (
              <Link to={`/movie/${movie.id}`} params={movie.id} key={movie.id}>
                <div
                  className="card mb-3 mr-2 movie-card card-border"
                  key={movie.id}
                  id="movie-card"
                >
                  <img
                    className="card-img"
                    src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="card-body text-style">
                    <p className="card-title">{movie.title}</p>
                    {movie.vote_average ? (
                    <span className="rating float-right">
                      <i
                        className="fa fa-star mr-1"
                        aria-hidden="true"
                      ></i>
                      {movie.vote_average}
                    </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <PageNavigation
            changePageNumber={this.changePage}
            totalPages={this.state.totalPages}
            activePage={this.state.activePage}
            movieFilter={this.state.movieFilterSelection}
            queryParams={this.state.query}
          ></PageNavigation>
          <footer>
            <img
              className="float-right"
              src={logo}
              alt="tmdbLogo"
              width="100"
              height="40"
            ></img>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
