import _ from "lodash";
import React from "react";
import { render } from "react-dom";
import moment from "moment";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from "material-ui/styles";

import * as data from "./data.json";

import { HabitDetails, Home } from './pages';

data.habits.forEach(h =>
  h.history.forEach(entry => (entry.when = moment(entry.when)))
);

const TODAY = "2017-12-31";

console.log(data);


const App = withStyles({
  habits: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
})(function (props) {
  const { classes, data } = props;
  console.log(classes);
  return (
    <Router>
      <div>
        <Route 
          exact path="/" 
          component={props => 
            <Home {...props} data={data} today={TODAY} />
          } 
        />
        <Route 
          path="/:habitKey" 
          component={props => 
            <HabitDetails {...props} data={data} today={TODAY} />
          } 
        />
      </div>
    </Router>
  );
});

render(<App data={data} />, document.querySelector("#root"));
