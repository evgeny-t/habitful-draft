import _ from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Reboot from 'material-ui/Reboot';
import { withStyles } from 'material-ui/styles';

import { HabitDetails, Home } from './pages';
import { store } from './configureStore';

const stylesEnhancer = withStyles({});

const App = _.flow(stylesEnhancer)(function(props) {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Reboot />
          <Route exact path="/" component={Home} />
          <Route path="/:habitKey" component={HabitDetails} />
        </div>
      </Router>
    </Provider>
  );
});

render(<App />, document.querySelector('#root'));
