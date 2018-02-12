import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import { HabitCard, Header } from '../../components';
import { Checklist } from './Checklist';

import Module from '../../dux';
const { completeRoutine } = Module;


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
      display: 'flex',
      flexDirection: 'row'
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
