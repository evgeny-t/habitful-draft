import _ from "lodash";
import React from "react";
import { render } from "react-dom";
import moment from "moment";

import { Link } from "react-router-dom";

import Typography from "material-ui/Typography";
import Card, { CardActions, CardContent } from "material-ui/Card";
import { withStyles } from "material-ui/styles";

import { Calendar } from "./Calendar";


export const HabitCard = withStyles(theme => ({
  H: {
    // border: '2px solid black',
    // width: 200,
    margin: 10
  },
}), { withTheme: true })(
  class extends React.Component {
    render() {
      const props = this.props;
      return (
        <Card className={props.classes.H}>
          <CardContent>
            <Typography>
              <Link to={`/${_.kebabCase(props.routine)}`}>{props.routine}</Link>
            </Typography>
            <Calendar
              itemColor={this.getItemColor}
              today={moment("20180104")}
            />
          </CardContent>
        </Card>
      );
    }

    getItemColor = date => {
      const props = this.props;
      // TODO(ET): should not be O(n)
      if (props.history.find(x => x.when.isSame(date, "day"))) {
        return this.props.theme.palette.secondary['A200'];
      }
      if (date.isSame(props.today)) {
        console.log(date.format());
        return "#000000";
      }
    };
  }
  );

