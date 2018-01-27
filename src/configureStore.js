import _ from 'lodash';
import moment from 'moment';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Module from './dux';

import * as data from './data.json';

data.habits.forEach(h =>
  h.history.forEach(entry => (entry.when = moment(entry.when)))
);

export const store = createStore(
  Module.reducer,
  Object.assign({}, data, { today: moment('2017-12-31') }),
  applyMiddleware(thunk)
);

window.store = store;
