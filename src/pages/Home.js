import _ from "lodash";
import React from "react";
import { render } from "react-dom";
import moment from "moment";

import Card, { CardActions, CardContent } from "material-ui/Card";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import { withStyles } from "material-ui/styles";

import { HabitCard, Header } from '../components';

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
                .filter(h => !moment(_.last(h.history)).isSame(this.props.today, "day"))
                .map(h => (
                  <ListItem key={`${h.routine}`}>
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

export const Home = withStyles({
  habits: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  content: {
    paddingTop: 80,
    // height: '100vh',
    // background: '#ff11fe',

    display: "flex",
    flexDirection: "row"
    // flexWrap: 'wrap',
  },
})(
  class extends React.Component {
    render() {
      const { data } = this.props;
      return (
        <div>
          <Header title="habitful" />
          <div className={this.props.classes.content}>
            <Checklist {...data} today={this.props.today} />
            <div className={this.props.classes.habits}>
              {data.habits.map(h => (
                <HabitCard key={h.routine} {...h} today={this.props.today} />
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
  );
