import _ from 'lodash';
import moment from 'moment';
import { dux } from 'redux-dux';
import produce from 'immer';
import { createSelector } from 'reselect';

const missingArg = name => new Error(`missing argument: ${name}`);

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
    }
    return state;
  }),

  removeHistoryEntry: produce((state, when) => {
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
