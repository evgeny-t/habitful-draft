import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import Zoom from 'material-ui/transitions/Zoom';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';

import { HabitCard, Header, HabitHistory } from '../components';

import Module from '../dux';
const { addHistoryEntry } = Module;

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
        addHistoryEntry: (id, date) => {
          dispatch(addHistoryEntry(id, date));
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
          <div className={this.props.classes.content}>
            <HabitCard {...habit} today={this.props.today} />
            <HabitHistory
              className={this.props.classes.list}
              habit={habit}
              today={this.props.today}
            />
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
          </div>
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
        moment(this.state.selectedDay)
      );
      this.setState({ addModalOpen: false });
    };
  }
);
