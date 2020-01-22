import React from "react";
import "./PageNavigation.css";
import { withRouter } from "react-router-dom";

class PageNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: parseInt(props.activePage)
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.sendPageNumber = this.sendPageNumber.bind(this);
  }

  componentDidUpdate(prevProps) {
    console.log("props did update", prevProps);
    if (this.state.currentPage !== prevProps.activePage) {
      this.setState({
        currentPage: prevProps.activePage
      });
    }
  }

  handlePageClick = e => {
    this.setState(
      {
        currentPage: Number(e.target.id)
      },
      () => {
        this.sendPageNumber();
      }
    );
  };

  sendPageNumber = () => {
    if (this.props.queryParams) {
      this.props.history.push(
        `/search/${this.props.queryParams}/${this.state.currentPage}`
      );
    } else {
      this.props.history.push(
        `/movies/${this.props.movieFilter}/${this.state.currentPage}`
      );
    }
    this.props.changePageNumber(this.state.currentPage);
  };

  makePageList() {
    let list = [];
    let currentActive = parseInt(this.state.currentPage);
    let maxPage = parseInt(this.props.totalPages);
    let pageStep = 3;
    for (let i = 0; i < pageStep; i++) {
      if (currentActive - 1 - i > 0) {
        list.push(currentActive - 1 - i);
      }
      if (currentActive + 1 + i < maxPage) {
        list.push(currentActive + 1 + i);
      }
    }
    list.push(currentActive);
    list = list.sort(function(a, b) {
      return a - b;
    });
    if (list[0] !== 1) {
      list.unshift(1);
    }
    if (list[list.length - 1] !== maxPage) {
      list.push(maxPage);
    }
    return list;
  }

  render() {
    let pageList = this.makePageList() ? this.makePageList() : [];
    let renderPageNumbers;

    renderPageNumbers = pageList.map(page => {
      let className =
        page === parseInt(this.state.currentPage)
          ? "page-link active"
          : "page-link";
      return (
        <li className={"page-item"} key={page}>
          <button
            className={className}
            id={page.toString()}
            onClick={this.handlePageClick}
          >
            {page.toString()}
          </button>
        </li>
      );
    });

    return <ul className="pagination mt-3">{renderPageNumbers}</ul>;
  }
}
export default withRouter(PageNavigation);
