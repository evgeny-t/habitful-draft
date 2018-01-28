import moment from 'moment';
import { createStore } from 'redux';

import Dux from './dux';

const f = Object.freeze;

describe('dux', () => {
  describe('completeRoutine', () => {
    it('should add todays date to the habit history', () => {
      const today = moment('1990-12-13');
      const store = createStore(
        Dux.reducer,
        f({
          habits: f([f({ _id: 1, history: f([]) })])
        })
      );

      store.dispatch(Dux.completeRoutine(1, today));
      expect(store.getState()).toMatchObject({
        habits: [{ _id: 1, history: [{ when: today }] }]
      });
    });
  });
});
