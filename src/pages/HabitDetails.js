import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import Zoom from 'material-ui/transitions/Zoom';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';
import { Paper, Grid, Button } from 'material-ui';

import { HabitCard, Header, HabitHistory } from '../components';

import Module from '../dux';
const { addHistoryEntry, removeHistoryEntry } = Module;

export const HabitDetails = _.flow(
  withStyles(
    theme =>
      console.log(theme) || {
        content: {
          paddingTop: 80
        },
        fab: {
          position: 'fixed',
          bottom: theme.spacing.unit * 3,
          right: theme.spacing.unit * 3
        }
      },
    { withTheme: true }
  ),
  connect(
    _.identity,
    dispatch => {
      return {
        addHistoryEntry(id, date) {
          dispatch(addHistoryEntry(id, date));
        },
        onEntryChange(id, date) {
          dispatch(removeHistoryEntry(id, date));
        }
      };
    },
    (stateProps, dispatchProps, ownProps) => {
      const habitKey = ownProps.match.params.habitKey;
      const habit = _.chain(stateProps.habits)
        .find(h => _.kebabCase(h.routine) === habitKey)
        .value();
      return Object.assign({ habit }, ownProps, stateProps, dispatchProps);
    }
  )
)(
  class extends React.Component {
    state = {
      addModalOpen: false,
      selectedDay: null
    };

    render() {
      const { habit } = this.props;
      return (
        <div>
          <Header title={habit.routine} />
          <Grid className={this.props.classes.content} container>
            <Grid item container xs={12} justify="center">
              <HabitCard
                {...habit}
                today={this.props.today}
                numberOfWeeks={50}
              />
            </Grid>
            <Grid item container justify="center">
              <Grid item xs={4}>
                <Paper>
                  <HabitHistory
                    habit={habit}
                    today={this.props.today}
                    onEntryChange={this.props.onEntryChange}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Zoom
              appear={true}
              in={true}
              timeout={this.props.theme.transitions.duration.enteringScreen}
              enterDelay={this.props.theme.transitions.duration.leavingScreen}
              unmountOnExit
            >
              <Button
                fab
                className={this.props.classes.fab}
                color="primary"
                onClick={this._handleAddClick}
              >
                <AddIcon />
              </Button>
            </Zoom>

            <Dialog
              open={this.state.addModalOpen}
              onClose={this._handleModalClose}
            >
              <DialogTitle>Add Entry</DialogTitle>
              <DialogContent>
                <DialogContentText>Add missing entry</DialogContentText>
                <DayPicker
                  selectedDays={this.state.selectedDay}
                  onDayClick={this._handleDayClick}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this._handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this._handleSubmit} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </div>
      );
    }

    _handleDayClick = (day, { selected }) => {
      this.setState({
        selectedDay: selected ? undefined : day
      });
    };

    _handleAddClick = () => {
      this.setState({ addModalOpen: true });
    };

    _handleModalClose = () => {
      this.setState({ addModalOpen: false });
    };

    _handleSubmit = () => {
      this.props.addHistoryEntry(
        this.props.habit._id,
        moment(this.state.selectedDay).startOf('day')
      );
      this.setState({ addModalOpen: false });
    };
  }
);
