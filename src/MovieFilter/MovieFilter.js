import React from "react";
import { Link } from "react-router-dom";
import "./MovieFilter.css";

class MovieFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieFilterSelection: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.sendFilterSelection = this.sendFilterSelection.bind(this);
  }

  handleClick(e) {
    this.setState({ movieFilterSelection: e }, () => {
      this.sendFilterSelection();
    });
  }
  sendFilterSelection = () => {
    this.props.filterSelection(this.state.movieFilterSelection);
  };

  render() {
    return (
      <div className="btn-group my-3" role="group">
        <Link
          to={"/movies/popular/"}
          onClick={() => this.handleClick("popular")}
          className="btn btn-secondary hvr-underline-from-center"
        >
          {" "}
          Popular
        </Link>
        <Link
          to={"/movies/top_rated"}
          onClick={() => this.handleClick("top_rated")}
          className="btn btn-secondary hvr-underline-from-center"
        >
          {" "}
          Top Rated
        </Link>
        <Link
          to={"/movies/upcoming"}
          onClick={() => this.handleClick("upcoming")}
          className="btn btn-secondary hvr-underline-from-center"
        >
          {" "}
          Upcoming
        </Link>
        <Link
          to={"/movies/now_playing"}
          onClick={() => this.handleClick("now_playing")}
          className="btn btn-secondary hvr-underline-from-center"
        >
          {" "}
          Now Playing
        </Link>
      </div>
    );
  }
}
export default MovieFilter;
