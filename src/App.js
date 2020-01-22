import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import Movie from "./Movie/Movie";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/movie/:id" component={Movie} />
            <Route exact path="/movies/:filter/:page?" component={Home} />
            <Route exact path="/search/:query?/:page?" component={Home} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
