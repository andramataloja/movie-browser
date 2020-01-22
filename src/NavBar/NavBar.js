import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { withRouter } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ searchQuery: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    this.sendQuery();
  }

  sendQuery = () => {
    this.props.history.push(`/search/${this.state.searchQuery}`);
    if (!this.props.match.params.id) {
      this.props.searchMovie(this.state.searchQuery);
    }
  };

  render() {
    return (
      <div>
        <nav className="navbar mt-2">
          <Link to="/">
            <div className="navBarTheme">MovieBrowser</div>
          </Link>
          <form className="form-inline">
            <input
              type="text"
              placeholder="Search for movies"
              value={this.state.searchQuery}
              onChange={this.handleChange}
            />
            <button
              className="search-button"
              type="submit"
              onClick={this.handleClick}
            >
            <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
