import moment from 'moment';
import { createStore } from 'redux';

import Dux from './dux';

function deepFreeze(o) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function(prop) {
    if (
      o.hasOwnProperty(prop) &&
      o[prop] !== null &&
      (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop]);
    }
  });

  return o;
}

expect.extend({
  toBeMoment(received, argument, granularity) {
    const pass = received.isSame(argument);
    if (pass) {
      return {
        message: () => `expected ${received} not to be same as ${argument}`,
        pass: true
      };
    } else {
      return {
        message: () => `expected ${received} to be same as ${argument}`,
        pass: false
      };
    }
  }
});

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

  describe('addHistoryEntry', () => {
    it('should add a history entry and keep entries ordered', () => {
      const store = createStore(
        Dux.reducer,
        deepFreeze({
          habits: [
            {
              _id: 1,
              history: [{ when: moment('1990-12-30') }]
            },
            {
              _id: 2,
              history: [
                { when: moment('1990-12-29') },
                { when: moment('1990-12-31') }
              ]
            }
          ]
        })
      );

      store.dispatch(Dux.addHistoryEntry(2, moment('19901230')));
      const habits = store.getState().habits;

      expect(habits).toMatchObject([
        {
          _id: 1
        },
        {
          _id: 2
        }
      ]);
      expect(habits[0].history).toHaveLength(1);
      expect(habits[0].history[0].when).toBeMoment(moment('19901230'))

      expect(habits[1].history).toHaveLength(3);
      expect(habits[1].history[0].when).toBeMoment(moment('19901229'))
      expect(habits[1].history[1].when).toBeMoment(moment('19901230'))
      expect(habits[1].history[2].when).toBeMoment(moment('19901231'))
    });
  });

  describe('removeHistoryEntry', () => {
    it('should remove a history entry and keep entries ordered', () => {
      const store = createStore(
        Dux.reducer,
        deepFreeze({
          habits: [
            {
              _id: 1,
              history: [{ when: moment('1990-12-30') }]
            },
            {
              _id: 2,
              history: [
                { when: moment('1990-12-31') },
                { when: moment('1990-12-30') },
                { when: moment('1990-12-29') }
              ]
            }
          ]
        })
      );

      store.dispatch(Dux.removeHistoryEntry(2, moment('19901230')));

      expect(store.getState()).toMatchObject({
        habits: [
          {
            _id: 1,
            history: [{ when: moment('1990-12-30') }]
          },
          {
            _id: 2
          }
        ]
      });
      const history = store.getState().habits[1].history;
      expect(history).toHaveLength(2);
      expect(history[0].when).toBeMoment(moment('19901229'));
      expect(history[1].when).toBeMoment(moment('19901231'));
    });
  });
});
