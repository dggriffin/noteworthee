var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import TeamView from './components/TeamView';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './stores/configureStore';
import { Provider } from 'react-redux';
const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

// Render the main component into the dom
ReactDOM.render(
      <Provider store={store}>
          <Router history={history}>
            <Route path='/' component={App}>
              <Route path='/:teamName(/:boardName)' component={TeamView}/>
            </Route>
          </Router>
      </Provider>,
      document.getElementById('app')
);
