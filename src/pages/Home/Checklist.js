import _ from 'lodash';
import React from 'react';
import moment from 'moment';

import Card from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';

const checklistStyles = {
  root: {
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

export const Checklist = withStyles(checklistStyles)(
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
                    !moment(_.get(_.last(h.history), 'when')).isSame(
                      this.props.today,
                      'day'
                    )
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
