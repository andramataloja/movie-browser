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

  activeTab = filterType => {
    const currentFilter = this.props.filter
    let className = "mr-3 movie-filter-btn hvr-underline-from-center";
    if (currentFilter === filterType) {
      className = "mr-3 movie-filter-btn hvr-underline-from-center underliner";
    }
    return className;
  };

  render() {
    return (
      <div className=" my-3" role="group">
        <Link
          to={"/movies/popular/"}
          onClick={() => this.handleClick("popular")}
          className={this.activeTab("popular")}
        >
          Popular
        </Link>
        <Link
          to={"/movies/top_rated"}
          onClick={() => this.handleClick("top_rated")}
          className={this.activeTab("top_rated")}
        >
          Top Rated
        </Link>
        <Link
          to={"/movies/upcoming"}
          onClick={() => this.handleClick("upcoming")}
          className={this.activeTab("upcoming")}
        >
          Upcoming
        </Link>
        <Link
          to={"/movies/now_playing"}
          onClick={() => this.handleClick("now_playing")}
          className={this.activeTab("now_playing")}
        >
          Now Playing
        </Link>
      </div>
    );
  }
}
export default MovieFilter;
