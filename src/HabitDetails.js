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
import { HabitCard } from './HabitCard';
import { Header } from './components/Header';

export const HabitDetails = withStyles(theme => console.log(theme) || ({
  content: {
    paddingTop: 80
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  },
}), { withTheme: true })(
  class extends React.Component {
    state = { 
      addModalOpen: false,
      selectedDay: null,
    }

    render() {
      const habitKey = this.props.match.params.habitKey;
      const habit = _.chain(data.habits)
        .find(h => _.kebabCase(h.routine) === habitKey)
        .value();
      return (
        <div>
          <Header title={habit.routine} />
          <div className={this.props.classes.content}>
            <HabitCard {...habit} today={this.props.today} />
            <List dense className={this.props.classes.list}>
              {_.chain(habit.history)
                .takeRight(10)
                .reverse()
                .map(entry => (
                  <ListItem>
                    <Checkbox checked={true} />
                    <ListItemText 
                      primary={`${entry.when.from(this.props.today)}`} 
                    />
                  </ListItem>
                ))
                .value()}
            </List>
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
                color='primary'
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
                <DialogContentText>
                  Add missing entry
                </DialogContentText>
                <DayPicker 
                  selectedDays={this.state.selectedDay}
                  onDayClick={this._handleDayClick}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this._handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this._handleModalClose} color="primary">
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
        selectedDay: selected ? undefined : day,
      });
    }

    _handleAddClick = () => {
      this.setState({ addModalOpen: true });
    }

    _handleModalClose = () => {
      this.setState({ addModalOpen: false });
    }
  }
  );

