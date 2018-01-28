import _ from 'lodash';
import { dux } from 'redux-dux';
import produce from 'immer';

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
