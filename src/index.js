import _ from "lodash";
import React from "react";
import { render } from "react-dom";
import moment from "moment";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from "material-ui/Button";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import AccountCircle from "material-ui-icons/AccountCircle";
import Modal from 'material-ui/Modal';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Card, { CardActions, CardContent } from "material-ui/Card";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import Zoom from 'material-ui/transitions/Zoom';
import AddIcon from 'material-ui-icons/Add';
import Checkbox from "material-ui/Checkbox";
import { withStyles } from "material-ui/styles";

import * as data from "./data.json";
import { Calendar } from "./Calendar";
import { HabitDetails } from './HabitDetails';
import { HabitCard } from './HabitCard';

data.habits.forEach(h =>
  h.history.forEach(entry => (entry.when = moment(entry.when)))
);

const TODAY = "2017-12-31";

console.log(data);



const checklistStyles = {
  root: {
    // border: '1px dashed blue',
    width: "30%",
    flexShrink: 0,
    minWidth: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "start"
  },
  list: {
    maxWidth: "300px"
  }
};

const Checklist = withStyles(checklistStyles)(
  class extends React.Component {
    render() {
      const { habits, classes } = this.props;
      return (
        <div className={classes.root}>
          <Card>
            <List dense className={classes.list}>
              {_(habits)
                .filter(h => !moment(_.last(h.history)).isSame(TODAY, "day"))
                .map(h => (
                  <ListItem>
                    <Checkbox />
                    <ListItemText primary={`${h.routine}`} />
                  </ListItem>
                ))
                .value()}
            </List>
          </Card>
        </div>
      );
    }
  }
);

const Header = withStyles({
  flex: {
    flex: 1
  }
})(
  class extends React.Component {
    render() {
      return (
        <AppBar>
          <Toolbar>
            <Typography
              type="title"
              color="inherit"
              className={this.props.classes.flex}
            >
              Title
            </Typography>
            <IconButton color="contrast">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      );
    }
  }
  );

const Content = withStyles({
  content: {
    paddingTop: 80,
    // height: '100vh',
    // background: '#ff11fe',

    display: "flex",
    flexDirection: "row"
    // flexWrap: 'wrap',
  }
})(
  class extends React.Component {
    render() {
      return (
        <div className={this.props.classes.content}>{this.props.children}</div>
      );
    }
  }
  );

const Home = withStyles({
  habits: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
})(
  class extends React.Component {
    render() {
      return (
        <Content>
          <Checklist {...data} />
          <div className={this.props.classes.habits}>
            {data.habits.map(h => <HabitCard {...h} today={TODAY} />)}
          </div>
        </Content>
      );
    }
  }
  );

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
        <Header />
        <Route exact path="/" component={Home} />
        <Route 
          path="/:habitKey" 
          component={props => 
            <HabitDetails {...props} today={TODAY} />
          } 
        />
      </div>
    </Router>
  );
});

render(<App data={data} />, document.querySelector("#root"));
