import _ from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';

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

const styles = {
  content: {
    paddingTop: 80,
    height: '100vh',
    // background: '#ff11fe',
    
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  H: {
    // border: '2px solid black',
    // width: 200,
    margin: 10,
  },
  flex: {
    flex: 1,
  },
};

const TODAY = '2017-12-31';

console.log(data)

// const todo = _.reduce(data.habits, (acc, habit) => {
//   habit.history.sort();
//   const todo = !moment(_.last(habit.history)).isSame(TODAY, 'day')
//   return _.set(acc, habit._id, todo);
// }, {});


const H = withStyles(styles)(
  class extends React.Component {
    render() {
      const props = this.props;
      return (
        <Card className={props.classes.H}>
          <CardContent>
            <Typography>{props.routine}</Typography>
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
      }}
    }
);

const App = withStyles(styles)(
  function(props) {
    const { classes, data } = props;
    console.log(classes)
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Typography 
              type='title' 
              color='inherit'
              className={classes.flex}
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

        <List
          dense
        >
          {
            _(data.habits)
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

        <div className={classes.content}>
          {
            data.habits.map(h => <H {...h} />)
          } 
        </div>
      </div>
    );
  }
);

render(<App data={data} />, document.querySelector('#root'));




