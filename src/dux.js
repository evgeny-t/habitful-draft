import _ from 'lodash';
import moment from 'moment';
import { dux } from 'redux-dux';
import produce from 'immer';
import { createSelector } from 'reselect';

export default dux({
  completeRoutine: produce((state, id, today) => {
    if (!id) throw new Error('missing argument: id');
    if (!today) throw new Error('missing argument: today');

    const habit = _.find(state.habits, ['_id', id]);
    if (habit) {
      habit.history.push({ when: today });
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
