import _ from 'lodash';
import moment from 'moment';
import { dux } from 'redux-dux';
import produce from 'immer';
import { createSelector } from 'reselect';

const missingArg = name => new Error(`missing argument: ${name}`);
const momentsComparer = (l, r) => (l.when.isBefore(r.when) ? -1 : 1);

export default dux({
  completeRoutine: produce((state, id, today) => {
    if (!id) throw missingArg('id');
    if (!today) throw missingArg('today');

    const habit = _.find(state.habits, ['_id', id]);
    if (habit) {
      habit.history.push({ when: today });
    }

    return state;
  }),

  addHistoryEntry: produce((state, id, date) => {
    if (!id) throw missingArg('id');
    if (!date) throw missingArg('date');

    const habit = _.find(state.habits, ['_id', id]);
    if (habit) {
      habit.history.push({ when: date });
      habit.history.sort(momentsComparer);
    }
    return state;
  }),

  removeHistoryEntry: produce((state, id, when) => {
    if (!id) throw missingArg('id');

    const habit = _.find(state.habits, ['_id', id]);
    if (habit) {
      const index = _.findIndex(habit.history, entry =>
        entry.when.isSame(when, 'day')
      );
      if (index >= 0) {
        const temp = habit.history
          .slice(0, index)
          .concat(habit.history.slice(index + 1, habit.history.length));
        temp.sort(momentsComparer);
        habit.history = temp;
      }
    }
    return state;
  })
});

export const selectors = {
  todo: today =>
    createSelector(
      state => state.habits,
      habits =>
        _(habits).filter(
          h => !moment(_.last(h.history)).isSame(this.props.today, 'day')
        )
    )
};
