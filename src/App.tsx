import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AppHeader from "./common/header";
import { Playboard } from './playboard/playboard';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Router>
          <div>
            <AppHeader />
            <Switch>
              <Route exact={true} path="/" component={Playboard} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
