import React from 'react';
import { browserHistory, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import Bowling from './containers/bowling-container';

const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="*" component={Bowling} />
    </Router>
  </Provider>
);

export default routes;
