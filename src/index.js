import _ from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Button from 'material-ui-next/Button';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import IconButton from 'material-ui-next/IconButton';
import AccountCircle from 'material-ui-icons-next/AccountCircle';
import Card, { CardActions, CardContent } from 'material-ui-next/Card';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui-next/List';
import Checkbox from 'material-ui-next/Checkbox';
import { withStyles } from 'material-ui-next/styles';

import * as data from './data.json';
import { Calendar } from './Calendar';

// console.log(data)

const TODAY = '2017-12-31';

console.log(data)

// const todo = _.reduce(data.habits, (acc, habit) => {
//   habit.history.sort();
//   const todo = !moment(_.last(habit.history)).isSame(TODAY, 'day')
//   return _.set(acc, habit._id, todo);
// }, {});


const HabitCard = withStyles({
  H: {
    // border: '2px solid black',
    // width: 200,
    margin: 10,
  },
})(
  class extends React.Component {
    render() {
      const props = this.props;
      return (
        <Card className={props.classes.H}>
          <CardContent>
            <Typography>
              <Link to={`/${_.kebabCase(props.routine)}`}>
                {props.routine}
              </Link>
            </Typography>
            <Calendar
              itemColor={this.getItemColor}
              today={moment('20180104')}
            />
          </CardContent>
        </Card>
      );
    }

    getItemColor = date => {
      const props = this.props;
      if (props.history.find(x =>
        moment(x.when).isSame(date, 'day'))) {
        return '#ee11ee';
      }
      if (date.isSame(TODAY)) {
        console.log(date.format())
        return '#000000';
      }
    }
  }
  );

const checklistStyles = {
  root: {
    // border: '1px dashed blue',
    width: '30%',
    flexShrink: 0,
    minWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
  },
  list: {
    maxWidth: '300px',
  },
};

const Checklist = withStyles(checklistStyles)(
  class extends React.Component {
    render() {
      const { habits, classes } = this.props;
      return (
        <div className={classes.root}>
          <Card>
            <List
              dense
              className={classes.list}
            >
              {
                _(habits)
                  .filter(h =>
                    !moment(_.last(h.history)).isSame(TODAY, 'day'))
                  .map(h => (
                    <ListItem>
                      <Checkbox />
                      <ListItemText
                        primary={`${h.routine}`}
                      />
                    </ListItem>
                  ))
                  .value()
              }
            </List>
          </Card>
        </div>
      );
    }
  }
);

const Header = withStyles({
  flex: {
    flex: 1,
  },
})(
  class extends React.Component {
    render() {
      return (
        <AppBar>
          <Toolbar>
            <Typography
              type='title'
              color='inherit'
              className={this.props.classes.flex}
            >
              Title
            </Typography>
            <IconButton
              color='contrast'
            >
              <AccountCircle></AccountCircle>
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

    display: 'flex',
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
})(
  class extends React.Component {
    render() {
      return (
        <div className={this.props.classes.content}>
          {this.props.children}
        </div>
      );
    }
  }
  );

const App = withStyles({
  habits: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})(
  function (props) {
    const { classes, data } = props;
    console.log(classes)
    return (
      <Router>
        <div>
          <Header />

          <Content>
            <Checklist {...data} />
            <div className={classes.habits}>
              {
                data.habits.map(h => <HabitCard {...h} />)
              }
            </div>
          </Content>

        </div>
      </Router>
    );
  }
  );

render(<App data={data} />, document.querySelector('#root'));




