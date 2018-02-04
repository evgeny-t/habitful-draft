import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export class HabitHistory extends React.PureComponent {
  static propTypes = {
    today: PropTypes.object.isRequired,
    habit: PropTypes.shape({
      history: PropTypes.array.isRequired
    }).isRequired
  };

  render() {
    return (
      <List dense className={this.props.className}>
        {_.chain(this.props.habit.history)
          .takeRight(10)
          .reverse()
          .map(entry => (
            <ListItem key={entry.when.format()}>
              <Checkbox checked={true} />
              <ListItemText
                primary={`${entry.when.from(this.props.today)}`}
                secondary={entry.when.format('ll')}
              />
            </ListItem>
          ))
          .value()}
      </List>
    );
  }
}
