var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import TeamView from './components/TeamView';
import { Router, Route, browserHistory } from 'react-router';

// Render the main component into the dom
ReactDOM.render(
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <Route path='/:teamName(/:boardName)' component={TeamView}/>
        </Route>
      </Router>, document.getElementById('app'));
