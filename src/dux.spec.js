import moment from 'moment';
import { createStore } from 'redux';

import Dux from './dux';

function deepFreeze (o) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
    && o[prop] !== null
    && (typeof o[prop] === "object" || typeof o[prop] === "function")
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });

  return o;
}

describe('dux', () => {
  describe('completeRoutine', () => {
    it('should add todays date to the habit history', () => {
      const today = moment('1990-12-13');
      const store = createStore(
        Dux.reducer,
        deepFreeze({
          habits: [{ _id: 1, history: [] }]
        })
      );

      store.dispatch(Dux.completeRoutine(1, today));
      expect(store.getState()).toMatchObject({
        habits: [{ _id: 1, history: [{ when: today }] }]
      });
    });
  });
});
