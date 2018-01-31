import _ from 'lodash';
import moment from 'moment';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import Module from './dux';

import * as data from './data.json';

data.habits.forEach(h =>
  h.history.forEach(entry => (entry.when = moment(entry.when)))
);

const dev = process.env.NODE_ENV === 'development';

export const store = createStore(
  Module.reducer,
  Object.assign({}, data, { today: moment('2017-12-31') }),
  applyMiddleware(...[].concat(thunk, dev ? logger : []))
);

window.store = store;
