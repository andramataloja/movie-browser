import React from "react";
import "./Navigation.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class Navigation extends React.Component {
  render() {
    return (
      <span className="navigation mt-3" onClick={() => history.goBack()}
      alt="Go back">
      <i
        className=" fa fa-long-arrow-left fa-lg mt-3 mb-2"
        aria-hidden="true"
      ></i>
      <span className="back ml-2">Back</span>
      </span>
    );
  }
}

export default Navigation;
