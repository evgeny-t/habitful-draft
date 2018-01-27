import _ from 'lodash'
import { dux } from 'redux-dux';

export default dux({
  completeRoutine: (state, id) => {
    console.log('completeRoutine:', state, id);
    const habit = _.find(state.habits, ['_id', id]);
    if (habit) {

    }

    return state;
  }
});
