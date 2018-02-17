import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import { HabitCard, Header } from '../../components';
import { Checklist } from './Checklist';

import Module from '../../dux';
const { completeRoutine } = Module;

export const Home = _.flow(
  withStyles({
    root: {
      height: '100vh',
      overflowX: 'hidden'
    },
    habits: {},
    content: {
      padding: '80px 20px 0px 20px'
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
        <div className={classes.root}>
          <Header title="habitful" />
          <Grid container className={classes.content}>
            <Grid xs={12} sm={4} item>
              <Checklist {...rest} />
            </Grid>
            <Grid xs={12} sm={8} item className={classes.habits}>
              <Grid container spacing={8}>
                {this.props.habits.map(h => (
                  <Grid item key={h.routine}>
                    <HabitCard {...h} today={this.props.today} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
);
