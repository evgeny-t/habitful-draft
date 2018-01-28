import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';

import { HabitCard, Header } from '../components';

import Module from '../dux';
const { completeRoutine } = Module;
console.log('completeRoutine', completeRoutine);

const checklistStyles = {
  root: {
    // border: '1px dashed blue',
    width: '30%',
    flexShrink: 0,
    minWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start'
  },
  list: {
    maxWidth: '300px'
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
                .filter(
                  h =>
                    !moment(_.last(h.history)).isSame(this.props.today, 'day')
                )
                .map(h => (
                  <ListItem key={`${h.routine}`}>
                    <Checkbox
                      inputProps={{
                        'data-id': h._id,
                        'data-routine': h.routine
                      }}
                      onChange={this._handleCheckBoxChange}
                    />
                    <ListItemText primary={`${h.routine}`} />
                  </ListItem>
                ))
                .value()}
            </List>
          </Card>
        </div>
      );
    }

    _handleCheckBoxChange = (event, value) => {
      const { onItemCheck } = this.props;
      onItemCheck && onItemCheck(event.currentTarget.dataset.id);
    };
  }
);

export const Home = _.flow(
  withStyles({
    habits: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    content: {
      paddingTop: 80,
      // height: '100vh',
      // background: '#ff11fe',

      display: 'flex',
      flexDirection: 'row'
      // flexWrap: 'wrap',
    }
  }),
  connect(_.constant({}), (dispatch, { today }) => {
    return {
      onItemCheck: id => dispatch(completeRoutine(id, today))
    };
  }),
  connect(_.identity)
)(
  class extends React.Component {
    render() {
      const { classes, ...rest } = this.props;
      return (
        <div>
          <Header title="habitful" />
          <div className={classes.content}>
            <Checklist {...rest} />
            <div className={classes.habits}>
              {this.props.habits.map(h => (
                <HabitCard key={h.routine} {...h} today={this.props.today} />
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
);
